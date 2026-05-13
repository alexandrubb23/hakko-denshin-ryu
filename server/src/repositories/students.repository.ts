import { Role, StudentCategory } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";

// ─── Domain types ─────────────────────────────────────────────────────────────

export type User = {
  id: string;
  name: string;
  email: string;
  category: StudentCategory;
};

type UserWithPassword = User & { hashedPassword: string };

type StudentRankEntry = {
  rankEntryId: string;
  userId: string;
  rankId: number;
  awardedAt: Date;
  notes: string | null;
};

// ─── Rank selects ─────────────────────────────────────────────────────────────

export const RANK_ENTRY_SELECT = {
  id: true,
  rankId: true,
  awardedAt: true,
  notes: true,
  rank: { select: { name: true, belt: true, order: true } },
} as const;

// ─── Guards ───────────────────────────────────────────────────────────────────

export const findStudentById = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: { role: true, deletedAt: true, email: true },
  });

export const findRankEntryById = (rankEntryId: string) =>
  prisma.studentRank.findUnique({ where: { id: rankEntryId } });

// ─── Ranks ────────────────────────────────────────────────────────────────────

export const findAllRanks = () =>
  prisma.rank.findMany({
    select: { id: true, name: true, belt: true, order: true },
    orderBy: { order: "asc" },
  });

export const findRankById = (rankId: number) =>
  prisma.rank.findUnique({ where: { id: rankId } });

export const findStudentTopRank = (userId: string) =>
  prisma.studentRank.findFirst({
    where: { userId, deletedAt: null },
    orderBy: { rank: { order: "desc" } },
    select: { rank: { select: { order: true } } },
  });

export const findStudentRanks = (userId: string) =>
  prisma.studentRank.findMany({
    where: { userId, deletedAt: null },
    select: RANK_ENTRY_SELECT,
    orderBy: { awardedAt: "desc" },
  });

export const createStudentRank = ({
  userId,
  rankId,
  awardedAt,
  notes,
}: Omit<StudentRankEntry, "rankEntryId">) =>
  prisma.studentRank.create({
    data: { userId, rankId, awardedAt, notes },
    select: RANK_ENTRY_SELECT,
  });

export const updateStudentRank = ({
  rankEntryId,
  awardedAt,
  notes,
}: Omit<StudentRankEntry, "userId" | "rankId">) =>
  prisma.studentRank.update({
    where: { id: rankEntryId },
    data: { awardedAt, notes },
    select: RANK_ENTRY_SELECT,
  });

export const softDeleteStudentRank = (rankEntryId: string) =>
  prisma.studentRank.update({
    where: { id: rankEntryId },
    data: { deletedAt: new Date() },
  });

// ─── Students ─────────────────────────────────────────────────────────────────

export const findAllStudents = () =>
  prisma.user.findMany({
    where: { role: Role.student, deletedAt: null },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      category: true,
      createdAt: true,
      image: true,
    },
    orderBy: { name: "asc" },
  });

export const findStudentWithDetails = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      category: true,
      createdAt: true,
      image: true,
      role: true,
      deletedAt: true,
    },
  });

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const createStudent = ({
  id,
  name,
  email,
  category,
  hashedPassword,
}: UserWithPassword) =>
  prisma.user.create({
    data: {
      id,
      name,
      email,
      category,
      emailVerified: false,
      role: Role.student,
      accounts: {
        create: {
          id: crypto.randomUUID(),
          accountId: id,
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      category: true,
      createdAt: true,
    },
  });

export const updateStudentProfile = ({ id, name, email, category }: User) =>
  prisma.user.update({
    where: { id },
    data: { name, email, category },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      category: true,
      createdAt: true,
    },
  });

export const updateStudentPassword = (userId: string, hashedPassword: string) =>
  prisma.account.updateMany({
    where: { userId, providerId: "credential" },
    data: { password: hashedPassword },
  });

export const softDeleteStudent = (id: string) =>
  prisma.$transaction([
    prisma.user.update({ where: { id }, data: { deletedAt: new Date() } }),
    prisma.session.deleteMany({ where: { userId: id } }),
  ]);

// ─── Invite flow ──────────────────────────────────────────────────────────────

const STUDENT_SELECT = {
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  category: true,
  createdAt: true,
} as const;

export const createStudentWithoutPassword = ({
  id,
  name,
  email,
  category,
}: User) =>
  prisma.user.create({
    data: {
      id,
      name,
      email,
      category,
      emailVerified: false,
      role: Role.student,
    },
    select: STUDENT_SELECT,
  });

export const createStudentAccount = (userId: string, hashedPassword: string) =>
  prisma.account.create({
    data: {
      id: crypto.randomUUID(),
      accountId: userId,
      providerId: "credential",
      userId,
      password: hashedPassword,
    },
  });

export const invalidatePendingInvites = (userId: string) =>
  prisma.invitationToken.deleteMany({ where: { userId, usedAt: null } });

export const createInvitationToken = ({
  userId,
  tokenHash,
  expiresAt,
}: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) => prisma.invitationToken.create({ data: { userId, tokenHash, expiresAt } });

export const findValidInvitationToken = (tokenHash: string) =>
  prisma.invitationToken.findFirst({
    where: {
      tokenHash,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: {
      user: { select: { id: true, name: true, email: true, deletedAt: true } },
    },
  });

export const markInvitationTokenUsed = (id: string) =>
  prisma.invitationToken.update({
    where: { id },
    data: { usedAt: new Date() },
  });

export const verifyStudentEmail = (userId: string) =>
  prisma.user.update({
    where: { id: userId },
    data: { emailVerified: true },
  });

// ─── Attendance ───────────────────────────────────────────────────────────────

export type AttendanceQuery = { userId: string; from: Date; to: Date };

export const findStudentAttendance = ({ userId, from, to }: AttendanceQuery) =>
  prisma.studentAttendance.findMany({
    where: { userId, date: { gte: from, lt: to } },
    select: { id: true, date: true, attended: true },
    orderBy: { date: "asc" },
  });

export const findAttendanceForDate = (date: Date) =>
  prisma.studentAttendance.findMany({
    where: { date },
    select: { userId: true, attended: true },
  });

export const upsertStudentAttendance = ({
  userId,
  date,
  attended,
}: {
  userId: string;
  date: Date;
  attended: boolean;
}) =>
  prisma.studentAttendance.upsert({
    where: { userId_date: { userId, date } },
    create: { userId, date, attended },
    update: { attended },
    select: { id: true, date: true, attended: true },
  });

// ─── Image ────────────────────────────────────────────────────────────────────

export const findStudentImageById = (id: string) =>
  prisma.user.findUnique({ where: { id }, select: { image: true } });

export const updateStudentImage = (id: string, imageUrl: string) =>
  prisma.user.update({ where: { id }, data: { image: imageUrl } });

// ─── Events ───────────────────────────────────────────────────────────────────

export const findStudentEvents = async (userId: string) => {
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
