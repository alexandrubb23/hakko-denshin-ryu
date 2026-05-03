import { hashPassword } from "@better-auth/utils/password";
import { setPasswordSchema } from "@hakko/core";
import { createHash } from "crypto";
import { Router } from "express";
import { HttpBadRequestError } from "../lib/http-errors.js";
import { ApiRoutes } from "../lib/routes.js";
import { validate } from "../lib/validate.js";
import {
  createStudentAccount,
  findValidInvitationToken,
  markInvitationTokenUsed,
  verifyStudentEmail,
} from "../repositories/students.repository.js";

const router = Router();

const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

const resolveToken = async (token: string) => {
  const record = await findValidInvitationToken(hashToken(token));
  if (!record || record.user.deletedAt !== null) {
    throw new HttpBadRequestError("Invalid or expired invitation link");
  }
  return record;
};

router.get(ApiRoutes.inviteVerifyToken, async (req, res) => {
  const token = req.query.token as string | undefined;
  if (!token) throw new HttpBadRequestError("Token is required");

  const record = await resolveToken(token);
  res.json({ name: record.user.name, email: record.user.email });
});

router.post(ApiRoutes.inviteSetPassword, async (req, res) => {
  const { token, password } = validate(setPasswordSchema, req.body);

  const record = await resolveToken(token);

  const hashedPassword = await hashPassword(password);
  await createStudentAccount(record.userId, hashedPassword);
  await markInvitationTokenUsed(record.id);
  await verifyStudentEmail(record.userId);

  res.json({ ok: true });
});

export default router;
