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
import { ApiRoutes } from "../lib/routes.js";
import { validate } from "../lib/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { uploadMiddleware } from "../middleware/upload.js";
import {
  createStudent,
  createStudentRank,
  findAllRanks,
  findAllStudents,
  findRankById,
  findRankEntryById,
  findStudentAttendance,
  findStudentById,
  findStudentEvents,
  findStudentImageById,
  findStudentRanks,
  findStudentTopRank,
  findStudentWithDetails,
  findUserByEmail,
  softDeleteStudent,
  softDeleteStudentRank,
  updateStudentImage,
  updateStudentPassword,
  updateStudentProfile,
  updateStudentRank,
  upsertStudentAttendance,
} from "../repositories/students.repository.js";

const MIN_MONTH = 1; // January
const MAX_MONTH = 12; // December
const MIN_YEAR = 2000;
const MAX_YEAR = new Date().getUTCFullYear() + 1;

const router = Router();

const requireStudent = async (id: string, res: Response) => {
  const student = await findStudentById(id);
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
  const rankEntry = await findRankEntryById(rankEntryId);
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
    const ranks = await findAllRanks();
    res.json({ ranks });
  }
);

router.get(
  ApiRoutes.adminStudents,
  requireAuth,
  requireRole(Role.admin),
  async (_req, res) => {
    const students = await findAllStudents();
    res.json({ students });
  }
);

router.get(
  ApiRoutes.adminStudent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    const student = await findStudentWithDetails(id);

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

    const ranks = await findStudentRanks(id);
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

    const targetRank = await findRankById(rankId);
    if (!targetRank) {
      res.status(404).json({ error: "Rank not found" });
      return;
    }

    const currentTop = await findStudentTopRank(id);

    const expectedOrder = currentTop ? currentTop.rank.order + 1 : 1;
    if (targetRank.order !== expectedOrder) {
      res.status(422).json({
        error: "Rank must follow the student's current rank in sequence.",
      });
      return;
    }

    const rank = await createStudentRank(
      id,
      rankId,
      new Date(awardedAt),
      notes ?? null
    );

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

    const rank = await updateStudentRank(
      rankEntryId,
      new Date(awardedAt),
      notes ?? null
    );

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

    const existing = await findUserByEmail(email);
    if (existing) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const id = crypto.randomUUID();
    const hashedPassword = await hashPassword(password);

    const student = await createStudent(id, name, email, hashedPassword);
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
      const existing = await findUserByEmail(email);
      if (existing) {
        res.status(409).json({ error: "Email already in use" });
        return;
      }
    }

    const updated = await updateStudentProfile(id, name, email);

    if (password) {
      const hashedPassword = await hashPassword(password);
      await updateStudentPassword(id, hashedPassword);
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

    await softDeleteStudentRank(rankEntryId);
    res.status(204).end();
  }
);

router.delete(
  ApiRoutes.adminStudent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    // requireStudent returns null (with 404) for non-student or soft-deleted IDs,
    // so admin IDs get the same 404 response — preventing role enumeration.
    const student = await requireStudent(id, res);
    if (!student) return;

    await softDeleteStudent(id);
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

    if (year < MIN_YEAR || year > MAX_YEAR) {
      res.status(400).json({
        error: `year must be between ${MIN_YEAR} and ${MAX_YEAR}`,
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

    const records = await findStudentAttendance(id, from, to);
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

    const record = await upsertStudentAttendance(id, date, attended);
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

      const existing = await findStudentImageById(id);

      const imageUrl = await uploadAvatar(req.file.buffer, id, existing?.image);

      await updateStudentImage(id, imageUrl);

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

    const events = await findStudentEvents(id);
    res.json({ events });
  }
);

export default router;
