import { prisma } from "../lib/prisma.js";
import {
  AttendanceQuery,
  findStudentAttendance,
  findStudentEvents,
  findStudentImageById,
  RANK_ENTRY_SELECT,
} from "./students.repository.js";

export const findMyRanks = (userId: string) =>
  prisma.studentRank.findMany({
    where: { userId, deletedAt: null },
    select: RANK_ENTRY_SELECT,
    orderBy: { awardedAt: "desc" },
  });

export const findMyAttendance = (query: AttendanceQuery) =>
  findStudentAttendance(query);

export const findMyEvents = (userId: string) => findStudentEvents(userId);

export const findUserImageById = (userId: string) =>
  findStudentImageById(userId);

export const updateUserImageById = (userId: string, imageUrl: string) =>
  prisma.user.update({
    where: { id: userId },
    data: { image: imageUrl },
  });
