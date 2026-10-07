import {
  createEventSchema,
  updateEventSchema,
  upsertEventParticipationSchema,
} from "@hakko/core";
import { Router } from "express";
import { Role } from "../generated/prisma/enums.js";
import { uploadEventImage } from "../lib/cloudinary.js";
import { HttpNotFoundError } from "../lib/http-errors.js";
import { ApiRoutes } from "../lib/routes.js";
import { validate } from "../lib/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { uploadMiddleware } from "../middleware/upload.js";
import {
  createEvent,
  findAdminEvents,
  findEventById,
  findEventParticipants,
  findPublishedEventBySlug,
  findPublishedEvents,
  softDeleteEvent,
  updateEvent,
  updateEventImage,
  upsertEventParticipation,
} from "../repositories/events.repository.js";
import { requireFile, requireId } from "../utils/request.js";
import { isSlug } from "../utils/slug.js";
import { requireStudent } from "../utils/student.js";

const router = Router();

/** Any not deleted event, published or not, for the admin routes */
const requireEvent = async (id: string) => {
  const event = await findEventById(id);
  if (!event || event.deletedAt !== null) {
    throw new HttpNotFoundError("Event not found");
  }
  return event;
};

// ─── Public routes ────────────────────────────────────────────────────────────

router.get(ApiRoutes.events, async (_req, res) => {
  const events = await findPublishedEvents();
  res.json({ events });
});

// The public event page; a malformed slug 404s like an unknown one
router.get(ApiRoutes.event, async (req, res) => {
  const { slug } = req.params;
  const event = isSlug(slug) ? await findPublishedEventBySlug(slug) : null;
  if (!event) throw new HttpNotFoundError("Event not found");
  res.json({ event });
});

// ─── Admin routes ─────────────────────────────────────────────────────────────

router.get(
  ApiRoutes.adminEvents,
  requireAuth,
  requireRole(Role.admin),
  async (_req, res) => {
    const events = await findAdminEvents();
    res.json({ events });
  }
);

router.post(
  ApiRoutes.adminEvents,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const { ticketUrl, ...rest } = validate(createEventSchema, req.body);

    const event = await createEvent({ ...rest, ticketUrl: ticketUrl || null });

    res.status(201).json({ event });
  }
);

router.put(
  ApiRoutes.adminEvent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);
    await requireEvent(id);

    const { ticketUrl, ...rest } = validate(updateEventSchema, req.body);

    const updated = await updateEvent(id, {
      ...rest,
      ticketUrl: ticketUrl || null,
    });

    res.json({ event: updated });
  }
);

router.delete(
  ApiRoutes.adminEvent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);
    await requireEvent(id);
    await softDeleteEvent(id);
    res.status(204).end();
  }
);

router.post(
  ApiRoutes.adminEventImage,
  requireAuth,
  requireRole(Role.admin),
  uploadMiddleware,
  async (req, res) => {
    const id = requireId(req);
    const event = await requireEvent(id);

    const file = requireFile(req);

    const imageUrl = await uploadEventImage({
      buffer: file.buffer,
      eventId: id,
      existingImageUrl: event.image,
    });
    await updateEventImage(id, imageUrl);

    res.json({ image: imageUrl });
  }
);

router.get(
  ApiRoutes.adminEventParticipants,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);
    await requireEvent(id);
    const participants = await findEventParticipants(id);
    res.json({ participants });
  }
);

router.post(
  ApiRoutes.adminEventParticipants,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);
    await requireEvent(id);

    const { userId, attended } = validate(
      upsertEventParticipationSchema,
      req.body
    );

    await requireStudent(userId);

    const participation = await upsertEventParticipation({
      eventId: id,
      userId,
      attended,
    });
    res.status(200).json({ participation });
  }
);

export default router;
