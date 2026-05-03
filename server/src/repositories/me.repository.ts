import { prisma } from "../lib/prisma.js";

export const findMyRanks = (userId: string) =>
  prisma.studentRank.findMany({
    where: { userId, deletedAt: null },
    select: {
      id: true,
      rankId: true,
      awardedAt: true,
      notes: true,
      rank: {
        select: { name: true, belt: true, order: true },
      },
    },
    orderBy: { awardedAt: "desc" },
  });

export const findMyAttendance = (userId: string, from: Date, to: Date) =>
  prisma.studentAttendance.findMany({
    where: { userId, date: { gte: from, lt: to } },
    select: { id: true, date: true, attended: true },
    orderBy: { date: "asc" },
  });

export const findMyEvents = async (userId: string) => {
  const events = await prisma.event.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      name: true,
      type: true,
      status: true,
      startDate: true,
      endDate: true,
      location: true,
      participants: {
        where: { userId },
        select: { attended: true },
        take: 1,
      },
    },
    orderBy: { startDate: "asc" },
  });

  return events.map(({ participants, ...event }) => ({
    ...event,
    attended: participants[0]?.attended ?? null,
  }));
};

export const findUserImageById = (userId: string) =>
  prisma.user.findUnique({
    where: { id: userId },
    select: { image: true },
  });

export const updateUserImageById = (userId: string, imageUrl: string) =>
  prisma.user.update({
    where: { id: userId },
    data: { image: imageUrl },
  });
