import { toUtcDate } from "@hakko/core";
import { Router } from "express";
import { Role } from "../generated/prisma/enums.js";
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

export default router;
