import { toUtcDate } from "@hakko/core";
import { Router } from "express";
import { EventStatus, EventType, Role } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
import { ApiRoutes } from "../lib/routes.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

type Period = "all" | "day" | "week" | "month" | "year";

function getDateFilter(period: Period): { gte: Date; lt: Date } | undefined {
  if (period === "all") return undefined;

  const now = new Date();
  const y = now.getUTCFullYear();
  const mo = now.getUTCMonth() + 1;
  const d = now.getUTCDate();

  switch (period) {
    case "day": {
      const from = toUtcDate(y, mo, d);
      return { gte: from, lt: new Date(from.getTime() + 86_400_000) };
    }
    case "week": {
      const dow = now.getUTCDay(); // 0=Sun
      const diffToMon = dow === 0 ? -6 : 1 - dow;
      const from = toUtcDate(y, mo, d + diffToMon);
      return { gte: from, lt: new Date(from.getTime() + 7 * 86_400_000) };
    }
    case "month": {
      return { gte: toUtcDate(y, mo, 1), lt: toUtcDate(y, mo + 1, 1) };
    }
    case "year": {
      return { gte: toUtcDate(y, 1, 1), lt: toUtcDate(y + 1, 1, 1) };
    }
  }
}

const VALID_PERIODS: Period[] = ["all", "day", "week", "month", "year"];
const VALID_EVENT_TYPES: EventType[] = ["seminar", "demo", "camp", "other"];
const VALID_EVENT_STATUSES: EventStatus[] = ["draft", "published", "cancelled"];

const router = Router();

router.get(
  ApiRoutes.adminDashboardStudents,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const rawPeriod = req.query.period as string | undefined;
    const period: Period =
      rawPeriod && (VALID_PERIODS as string[]).includes(rawPeriod)
        ? (rawPeriod as Period)
        : "all";

    const dateFilter = getDateFilter(period);
    const attendanceWhere = dateFilter
      ? { attended: true, date: dateFilter }
      : { attended: true };

    const users = await prisma.user.findMany({
      where: { role: Role.student, deletedAt: null },
      select: {
        id: true,
        name: true,
        studentRanks: {
          where: { deletedAt: null },
          orderBy: { rank: { order: "desc" } },
          take: 1,
          select: {
            rank: {
              select: { id: true, name: true, belt: true, order: true },
            },
          },
        },
        _count: {
          select: { attendanceRecords: { where: attendanceWhere } },
        },
      },
      orderBy: { name: "asc" },
    });

    const students = users.map((u) => {
      const topRank = u.studentRanks[0]?.rank ?? null;
      return {
        id: u.id,
        name: u.name,
        rankId: topRank?.id ?? null,
        rankName: topRank?.name ?? null,
        belt: topRank?.belt ?? null,
        attendanceCount: u._count.attendanceRecords,
      };
    });

    // Unique ranks present among students, sorted by rank order asc
    const rankMap = new Map<
      number,
      { id: number; name: string; belt: string; order: number }
    >();
    for (const s of students) {
      if (
        s.rankId !== null &&
        s.rankName !== null &&
        s.belt !== null &&
        !rankMap.has(s.rankId)
      ) {
        const user = users.find((u) => u.id === s.id);
        const rank = user?.studentRanks[0]?.rank;
        if (rank) rankMap.set(rank.id, rank);
      }
    }
    const ranks = Array.from(rankMap.values()).sort(
      (a, b) => a.order - b.order
    );

    res.json({ total: students.length, students, ranks });
  }
);

router.get(
  ApiRoutes.adminDashboardEvents,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const rawType = req.query.type as string | undefined;
    const rawStatus = req.query.status as string | undefined;
    const rawYear = req.query.year as string | undefined;

    const typeFilter =
      rawType && (VALID_EVENT_TYPES as string[]).includes(rawType)
        ? (rawType as EventType)
        : undefined;

    const statusFilter =
      rawStatus && (VALID_EVENT_STATUSES as string[]).includes(rawStatus)
        ? (rawStatus as EventStatus)
        : undefined;

    const yearFilter =
      rawYear && rawYear !== "all" && /^\d{4}$/.test(rawYear)
        ? parseInt(rawYear, 10)
        : undefined;

    const yearDateFilter = yearFilter
      ? {
          gte: toUtcDate(yearFilter, 1, 1),
          lt: toUtcDate(yearFilter + 1, 1, 1),
        }
      : undefined;

    const events = await prisma.event.findMany({
      where: {
        deletedAt: null,
        ...(typeFilter ? { type: typeFilter } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(yearDateFilter ? { startDate: yearDateFilter } : {}),
      },
      select: {
        id: true,
        name: true,
        type: true,
        status: true,
        startDate: true,
        _count: {
          select: {
            participants: true,
          },
        },
        participants: {
          where: { attended: true },
          select: { id: true },
        },
      },
      orderBy: { startDate: "asc" },
    });

    const result = events.map((e) => ({
      id: e.id,
      name: e.name,
      type: e.type,
      status: e.status,
      startDate: e.startDate,
      registeredCount: e._count.participants,
      attendedCount: e.participants.length,
    }));

    // Derive available years from ALL events (no filters)
    const allEvents = await prisma.event.findMany({
      where: { deletedAt: null },
      select: { startDate: true },
    });
    const yearSet = new Set<number>(
      allEvents.map((e) => e.startDate.getUTCFullYear())
    );
    const availableYears = Array.from(yearSet).sort((a, b) => a - b);
    if (availableYears.length === 0) {
      availableYears.push(new Date().getUTCFullYear());
    }

    res.json({ total: result.length, events: result, availableYears });
  }
);

export default router;
