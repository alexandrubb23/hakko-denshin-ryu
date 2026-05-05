import { hashPassword } from "@better-auth/utils/password";
import {
  createStudentRankSchema,
  createStudentSchema,
  updateStudentRankSchema,
  updateStudentSchema,
} from "@hakko/core";
import { Router } from "express";
import { z } from "zod";
import { env } from "../env.js";
import { Role } from "../generated/prisma/enums.js";
import { uploadAvatar } from "../lib/cloudinary.js";
import { sendInvitationEmail } from "../lib/email.js";
import {
  HttpConflictError,
  HttpNotFoundError,
  HttpUnprocessableError,
} from "../lib/http-errors.js";
import { ApiRoutes, ClientRoutes } from "../lib/routes.js";
import { generateToken, hashToken } from "../lib/token.js";
import { validate } from "../lib/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { uploadMiddleware } from "../middleware/upload.js";
import {
  createInvitationToken,
  createStudent,
  createStudentRank,
  createStudentWithoutPassword,
  findAllRanks,
  findAllStudents,
  findRankById,
  findRankEntryById,
  findStudentAttendance,
  findStudentEvents,
  findStudentImageById,
  findStudentRanks,
  findStudentTopRank,
  findStudentWithDetails,
  findUserByEmail,
  invalidatePendingInvites,
  softDeleteStudent,
  softDeleteStudentRank,
  updateStudentImage,
  updateStudentPassword,
  updateStudentProfile,
  updateStudentRank,
  upsertStudentAttendance,
} from "../repositories/students.repository.js";
import { parseYearMonthParams } from "../utils/query-params.js";
import { requireFile, requireId } from "../utils/request.js";
import { requireStudent } from "../utils/student.js";

const router = Router();

const requireRankEntry = async (rankEntryId: string, studentId: string) => {
  const rankEntry = await findRankEntryById(rankEntryId);
  if (
    !rankEntry ||
    rankEntry.userId !== studentId ||
    rankEntry.deletedAt !== null
  ) {
    throw new HttpNotFoundError("Rank entry not found");
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
    const id = requireId(req);

    await requireStudent(id);
    const student = await findStudentWithDetails(id);
    res.json({ student });
  }
);

router.get(
  ApiRoutes.adminStudentRanks,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);
    const student = await requireStudent(id);
    const ranks = await findStudentRanks(id);
    res.json({ ranks });
  }
);

router.post(
  ApiRoutes.adminStudentRanks,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);
    await requireStudent(id);

    const { rankId, awardedAt, notes } = validate(
      createStudentRankSchema,
      req.body
    );

    const targetRank = await findRankById(rankId);
    if (!targetRank) throw new HttpNotFoundError("Rank not found");

    const currentTop = await findStudentTopRank(id);

    const expectedOrder = currentTop ? currentTop.rank.order + 1 : 1;
    if (targetRank.order !== expectedOrder) {
      throw new HttpUnprocessableError(
        "Rank must follow the student's current rank in sequence."
      );
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
    const studentId = requireId(req);
    const rankEntryId = requireId(req, "rankEntryId");

    await requireStudent(studentId);
    await requireRankEntry(rankEntryId, studentId);

    const { awardedAt, notes } = validate(updateStudentRankSchema, req.body);

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
    const { name, email, password, sendInvite } = validate(
      createStudentSchema,
      req.body
    );

    const existing = await findUserByEmail(email);
    if (existing) throw new HttpConflictError("Email already in use");

    const id = crypto.randomUUID();

    if (sendInvite) {
      const student = await createStudentWithoutPassword(id, name, email);

      await invalidatePendingInvites(id);

      const plainToken = generateToken();
      const tokenHash = hashToken(plainToken);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await createInvitationToken(id, tokenHash, expiresAt);

      const inviteUrl = `${env.CLIENT_URL}${ClientRoutes.setPassword}?token=${plainToken}`;
      await sendInvitationEmail(email, name, inviteUrl);

      return res.status(201).json({ student });
    }

    const hashedPassword = await hashPassword(password!);
    const student = await createStudent(id, name, email, hashedPassword);
    res.status(201).json({ student });
  }
);

router.put(
  ApiRoutes.adminStudent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);
    const student = await requireStudent(id);

    const { name, email, password, sendInvite } = validate(
      updateStudentSchema,
      req.body
    );

    if (email !== student.email) {
      const existing = await findUserByEmail(email);
      if (existing) throw new HttpConflictError("Email already in use");
    }

    if (sendInvite) {
      await invalidatePendingInvites(id);

      const plainToken = generateToken();
      const tokenHash = hashToken(plainToken);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await createInvitationToken(id, tokenHash, expiresAt);

      const inviteUrl = `${env.CLIENT_URL}${ClientRoutes.setPassword}?token=${plainToken}`;
      await sendInvitationEmail(email, name, inviteUrl);
    }

    const updated = await updateStudentProfile(id, name, email);

    if (!sendInvite && password) {
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
    const studentId = requireId(req);
    const rankEntryId = requireId(req, "rankEntryId");

    await requireStudent(studentId);
    await requireRankEntry(rankEntryId, studentId);

    await softDeleteStudentRank(rankEntryId);
    res.status(204).end();
  }
);

router.delete(
  ApiRoutes.adminStudent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);

    // requireStudent throws 404 for non-student or soft-deleted IDs,
    // so admin IDs get the same 404 response — preventing role enumeration.
    await requireStudent(id);

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
    const id = requireId(req);
    await requireStudent(id);

    const { from, to } = parseYearMonthParams(
      req.query.year as string | undefined,
      req.query.month as string | undefined
    );

    const records = await findStudentAttendance(id, from, to);
    res.json({ records });
  }
);

router.post(
  ApiRoutes.adminStudentAttendance,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);
    await requireStudent(id);

    const { date: dateStr, attended } = validate(
      upsertAttendanceSchema,
      req.body
    );

    const date = new Date(`${dateStr}T00:00:00.000Z`);
    const today = new Date();
    today.setUTCHours(23, 59, 59, 999);
    if (date > today) {
      throw new HttpUnprocessableError(
        "Cannot mark attendance for future dates"
      );
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
    const id = requireId(req);
    await requireStudent(id);

    const file = requireFile(req);

    const existing = await findStudentImageById(id);
    const imageUrl = await uploadAvatar(file.buffer, id, existing?.image);
    await updateStudentImage(id, imageUrl);

    res.json({ image: imageUrl });
  }
);

router.get(
  ApiRoutes.adminStudentEvents,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);
    await requireStudent(id);
    const events = await findStudentEvents(id);
    res.json({ events });
  }
);

export default router;
