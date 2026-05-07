import { EventStatus, EventType, Role } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";

type AttendanceWhere =
  | { attended: true }
  | { attended: true; date: { gte: Date; lt: Date } };

type EventFilters = {
  type?: EventType;
  status?: EventStatus;
  startDate?: { gte: Date; lt: Date };
};

export const findDashboardStudents = async (
  attendanceWhere: AttendanceWhere,
) => {
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

  const rankMap = new Map<
    number,
    { id: number; name: string; belt: string; order: number }
  >();
  for (const u of users) {
    const rank = u.studentRanks[0]?.rank;
    if (rank && !rankMap.has(rank.id)) rankMap.set(rank.id, rank);
  }
  const ranks = Array.from(rankMap.values()).sort((a, b) => a.order - b.order);

  return { students, ranks };
};

export const findDashboardEvents = async (filters: EventFilters) => {
  const events = await prisma.event.findMany({
    where: {
      deletedAt: null,
      ...(filters.type ? { type: filters.type } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.startDate ? { startDate: filters.startDate } : {}),
    },
    select: {
      id: true,
      name: true,
      type: true,
      status: true,
      startDate: true,
      _count: { select: { participants: true } },
      participants: { where: { attended: true }, select: { id: true } },
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

  const allEvents = await prisma.event.findMany({
    where: { deletedAt: null },
    select: { startDate: true },
  });
  const yearSet = new Set<number>(
    allEvents.map((e) => e.startDate.getUTCFullYear()),
  );
  const availableYears = Array.from(yearSet).sort((a, b) => a - b);
  if (availableYears.length === 0)
    availableYears.push(new Date().getUTCFullYear());

  return { events: result, availableYears };
};
