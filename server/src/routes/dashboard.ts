import { PERIOD_VALUES, type Period, toUtcDate } from "@hakko/core";
import { Router } from "express";
import { EventStatus, EventType, Role } from "../generated/prisma/enums.js";
import { ApiRoutes } from "../lib/routes.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import {
  findDashboardEvents,
  findDashboardStudents,
} from "../repositories/dashboard.repository.js";

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

const VALID_PERIODS: readonly Period[] = PERIOD_VALUES;
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
      ? { attended: true as const, date: dateFilter }
      : { attended: true as const };

    const { students, ranks } = await findDashboardStudents(attendanceWhere);
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

    const { events, availableYears } = await findDashboardEvents({
      type: typeFilter,
      status: statusFilter,
      startDate: yearDateFilter,
    });

    res.json({ total: events.length, events, availableYears });
  }
);

export default router;
