import { env } from "../env.js";
import { sendInvitationEmail } from "../lib/email.js";
import { ApiRoutes, ClientRoutes } from "../lib/routes.js";
import { generateToken, hashToken } from "../lib/token.js";
import {
  createInvitationToken,
  invalidatePendingInvites,
} from "../repositories/students.repository.js";

/**
 * Invalidates any pending invites for the student, creates a new invitation
 * token, and sends the invitation email to the given address.
 */
export const sendStudentInvitation = async (
  id: string,
  email: string,
  name: string
): Promise<void> => {
  await invalidatePendingInvites(id);

  const plainToken = generateToken();
  const tokenHash = hashToken(plainToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await createInvitationToken(id, tokenHash, expiresAt);

  const inviteUrl = `${env.CLIENT_URL}${ClientRoutes.setPassword}?token=${plainToken}`;
  await sendInvitationEmail(email, name, inviteUrl);
};
