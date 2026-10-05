import type { IntlMessageID } from "i18n/messages";

/**
 * Maps known English error messages (from shared zod schemas and the API)
 * to translation keys, so they can be shown in the active language.
 */
const ERROR_MESSAGE_IDS: Record<string, IntlMessageID> = {
  "Something went wrong. Please try again.": "error.generic",
  "Cannot set a password when sending an invitation email":
    "error.validation.password.invite",
  "Category must be 'kid' or 'senior'": "error.validation.category",
  "Details must be at least 10 characters": "error.validation.details.min10",
  "Add at least one date": "error.validation.sessions.min",
  "An event can have at most 31 dates": "error.validation.sessions.max",
  "End date must be after start date": "error.validation.endDate",
  "End time must be after start time": "error.validation.endTime",
  "Invalid ISO date-time string (expected UTC ISO 8601)":
    "error.validation.dateTime",
  "Invalid email address": "error.validation.email",
  "Invalid event type": "error.validation.eventType",
  "Invalid status": "error.validation.status",
  "Invalid ticket URL": "error.validation.ticketUrl",
  "Location must be at least 2 characters": "error.validation.location.min2",
  "Name must be at least 2 characters": "error.validation.name.min2",
  "Name must be at least 3 characters": "error.validation.name.min3",
  "Password must be at least 8 characters": "error.validation.password.min8",
  "Please select a rank": "error.validation.rank",
  "Please select a valid date": "error.validation.date",
  "Token is required": "error.validation.token",
  "User ID is required": "error.validation.userId",
  "Internal server error": "error.server.internal",
  "Not found": "error.server.notFound",
  "Student not found": "error.server.studentNotFound",
  Forbidden: "error.server.forbidden",
  Unauthorized: "error.server.unauthorized",
  "No image file provided": "error.server.noImage",
  "Only JPEG, PNG, and WebP images are allowed": "error.server.imageType",
  "Rank entry not found": "error.server.rankEntryNotFound",
  "Rank not found": "error.server.rankNotFound",
  "Rank must follow the student's current rank in sequence.":
    "error.server.rankSequence",
  "Email already in use": "error.server.emailInUse",
  "Invalid or expired invitation link": "error.server.invalidInvite",
  "Event not found": "error.server.eventNotFound",
  "Cannot mark attendance for future dates": "error.server.futureAttendance",
};

export default ERROR_MESSAGE_IDS;
