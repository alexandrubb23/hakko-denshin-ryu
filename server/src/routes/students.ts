import { hashPassword } from "@better-auth/utils/password";
import {
  createStudentRankSchema,
  createStudentSchema,
  toUtcDate,
  updateStudentRankSchema,
  updateStudentSchema,
} from "@hakko/core";
import { Router, type Response } from "express";
import { z } from "zod";
import { Role } from "../generated/prisma/enums.js";
import { uploadAvatar } from "../lib/cloudinary.js";
import { prisma } from "../lib/prisma.js";
import { ApiRoutes } from "../lib/routes.js";
import { validate } from "../lib/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { uploadMiddleware } from "../middleware/upload.js";

const MIN_MONTH = 1; // January
const MAX_MONTH = 12; // December

const router = Router();

const requireStudent = async (id: string, res: Response) => {
  const student = await prisma.user.findUnique({
    where: { id },
    select: { role: true, deletedAt: true, email: true },
  });
  if (!student || student.role !== Role.student || student.deletedAt !== null) {
    res.status(404).json({ error: "Student not found" });
    return null;
  }
  return student;
};

const requireRankEntry = async (
  rankEntryId: string,
  studentId: string,
  res: Response
) => {
  const rankEntry = await prisma.studentRank.findUnique({
    where: { id: rankEntryId },
  });
  if (
    !rankEntry ||
    rankEntry.userId !== studentId ||
    rankEntry.deletedAt !== null
  ) {
    res.status(404).json({ error: "Rank entry not found" });
    return null;
  }
  return rankEntry;
};

router.get(
  ApiRoutes.adminRanks,
  requireAuth,
  requireRole(Role.admin),
  async (_req, res) => {
    const ranks = await prisma.rank.findMany({
      select: { id: true, name: true, belt: true, order: true },
      orderBy: { order: "asc" },
    });
    res.json({ ranks });
  }
);

router.get(
  ApiRoutes.adminStudents,
  requireAuth,
  requireRole(Role.admin),
  async (_req, res) => {
    const students = await prisma.user.findMany({
      where: { role: Role.student, deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: { name: "asc" },
    });

    res.json({ students });
  }
);

router.get(
  ApiRoutes.adminStudent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    const student = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        image: true,
        role: true,
        deletedAt: true,
      },
    });

    if (
      !student ||
      student.role !== Role.student ||
      student.deletedAt !== null
    ) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    res.json({ student });
  }
);

router.get(
  ApiRoutes.adminStudentRanks,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    const student = await requireStudent(id, res);
    if (!student) return;

    const ranks = await prisma.studentRank.findMany({
      where: { userId: id, deletedAt: null },
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

    res.json({ ranks });
  }
);

router.post(
  ApiRoutes.adminStudentRanks,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    const student = await requireStudent(id, res);
    if (!student) return;

    const parsed = validate(createStudentRankSchema, req.body, res);
    if (!parsed) return;

    const { rankId, awardedAt, notes } = parsed;

    const targetRank = await prisma.rank.findUnique({ where: { id: rankId } });
    if (!targetRank) {
      res.status(404).json({ error: "Rank not found" });
      return;
    }

    const currentTop = await prisma.studentRank.findFirst({
      where: { userId: id, deletedAt: null },
      orderBy: { rank: { order: "desc" } },
      select: { rank: { select: { order: true } } },
    });

    const expectedOrder = currentTop ? currentTop.rank.order + 1 : 1;
    if (targetRank.order !== expectedOrder) {
      res.status(422).json({
        error: "Rank must follow the student's current rank in sequence.",
      });
      return;
    }

    const rank = await prisma.studentRank.create({
      data: {
        userId: id,
        rankId,
        awardedAt: new Date(awardedAt),
        notes: notes ?? null,
      },
      select: {
        id: true,
        rankId: true,
        awardedAt: true,
        notes: true,
        rank: { select: { name: true, belt: true, order: true } },
      },
    });

    res.status(201).json({ rank });
  }
);

router.put(
  ApiRoutes.adminStudentRank,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const studentId = req.params.id as string;
    const rankEntryId = req.params.rankEntryId as string;

    const student = await requireStudent(studentId, res);
    if (!student) return;

    const rankEntry = await requireRankEntry(rankEntryId, studentId, res);
    if (!rankEntry) return;

    const parsed = validate(updateStudentRankSchema, req.body, res);
    if (!parsed) return;

    const { awardedAt, notes } = parsed;

    const rank = await prisma.studentRank.update({
      where: { id: rankEntryId },
      data: {
        awardedAt: new Date(awardedAt),
        notes: notes ?? null,
      },
      select: {
        id: true,
        rankId: true,
        awardedAt: true,
        notes: true,
        rank: { select: { name: true, belt: true, order: true } },
      },
    });

    res.json({ rank });
  }
);

router.post(
  ApiRoutes.adminStudents,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const parsed = validate(createStudentSchema, req.body, res);
    if (!parsed) return;

    const { name, email, password } = parsed;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const id = crypto.randomUUID();
    const hashedPassword = await hashPassword(password);

    const student = await prisma.user.create({
      data: {
        id,
        name,
        email,
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
        createdAt: true,
      },
    });

    res.status(201).json({ student });
  }
);

router.put(
  ApiRoutes.adminStudent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    const student = await requireStudent(id, res);
    if (!student) return;

    const parsed = validate(updateStudentSchema, req.body, res);
    if (!parsed) return;

    const { name, email, password } = parsed;

    if (email !== student.email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        res.status(409).json({ error: "Email already in use" });
        return;
      }
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { name, email },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (password) {
      const hashedPassword = await hashPassword(password);
      await prisma.account.updateMany({
        where: { userId: id, providerId: "credential" },
        data: { password: hashedPassword },
      });
    }

    res.json({ student: updated });
  }
);

router.delete(
  ApiRoutes.adminStudentRank,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const studentId = req.params.id as string;
    const rankEntryId = req.params.rankEntryId as string;

    const student = await requireStudent(studentId, res);
    if (!student) return;

    const rankEntry = await requireRankEntry(rankEntryId, studentId, res);
    if (!rankEntry) return;

    await prisma.studentRank.update({
      where: { id: rankEntryId },
      data: { deletedAt: new Date() },
    });

    res.status(204).end();
  }
);

router.delete(
  ApiRoutes.adminStudent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    const student = await prisma.user.findUnique({ where: { id } });
    if (!student || student.deletedAt !== null) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    if (student.role === Role.admin) {
      res.status(403).json({ error: "Admin users cannot be deleted" });
      return;
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      }),
      prisma.session.deleteMany({ where: { userId: id } }),
    ]);

    res.status(204).end();
  }
);

const upsertAttendanceSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD"),
  attended: z.boolean(),
});

router.get(
  ApiRoutes.adminStudentAttendance,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    const student = await requireStudent(id, res);
    if (!student) return;

    const yearParam = req.query.year as string | undefined;
    const monthParam = req.query.month as string | undefined;

    const year = Number(yearParam);

    if (!yearParam || isNaN(year)) {
      res.status(400).json({
        error: "year query parameter is required and must be a number",
      });
      return;
    }

    let from: Date;
    let to: Date;

    if (monthParam !== undefined) {
      const month = Number(monthParam);
      if (isNaN(month) || month < MIN_MONTH || month > MAX_MONTH) {
        res.status(400).json({
          error: `month must be between ${MIN_MONTH} and ${MAX_MONTH}`,
        });
        return;
      }
      from = toUtcDate(year, month, 1);
      to = toUtcDate(year, month + 1, 1);
    } else {
      from = toUtcDate(year, 1, 1);
      to = toUtcDate(year + 1, 1, 1);
    }

    const records = await prisma.studentAttendance.findMany({
      where: { userId: id, date: { gte: from, lt: to } },
      select: { id: true, date: true, attended: true },
      orderBy: { date: "asc" },
    });

    res.json({ records });
  }
);

router.post(
  ApiRoutes.adminStudentAttendance,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    const student = await requireStudent(id, res);
    if (!student) return;

    const parsed = validate(upsertAttendanceSchema, req.body, res);
    if (!parsed) return;

    const { date: dateStr, attended } = parsed;

    const date = new Date(`${dateStr}T00:00:00.000Z`);
    const today = new Date();
    today.setUTCHours(23, 59, 59, 999);
    if (date > today) {
      res
        .status(422)
        .json({ error: "Cannot mark attendance for future dates" });
      return;
    }

    const record = await prisma.studentAttendance.upsert({
      where: { userId_date: { userId: id, date } },
      create: { userId: id, date, attended },
      update: { attended },
      select: { id: true, date: true, attended: true },
    });

    res.status(200).json({ record });
  }
);

router.post(
  ApiRoutes.adminStudentImage,
  requireAuth,
  requireRole(Role.admin),
  uploadMiddleware,
  async (req, res) => {
    try {
      const id = req.params.id as string;

      const student = await requireStudent(id, res);
      if (!student) return;

      if (!req.file) {
        res.status(400).json({ error: "No image file provided" });
        return;
      }

      const existing = await prisma.user.findUnique({
        where: { id },
        select: { image: true },
      });

      const imageUrl = await uploadAvatar(req.file.buffer, id, existing?.image);

      await prisma.user.update({
        where: { id },
        data: { image: imageUrl },
      });

      res.json({ image: imageUrl });
    } catch (err) {
      console.error("[POST /api/admin/students/:id/image] Error:", err);
      res.status(500).json({ error: "Image upload failed" });
    }
  }
);

router.get(
  ApiRoutes.adminStudentEvents,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    const student = await requireStudent(id, res);
    if (!student) return;

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
          where: { userId: id },
          select: { attended: true },
          take: 1,
        },
      },
      orderBy: { startDate: "asc" },
    });

    const result = events.map(({ participants, ...event }) => ({
      ...event,
      attended: participants[0]?.attended ?? null,
    }));

    res.json({ events: result });
  }
);

export default router;
