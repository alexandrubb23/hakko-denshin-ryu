import {
  createEventSchema,
  updateEventSchema,
  upsertEventParticipationSchema,
} from "@hakko/core";
import { Router } from "express";
import { EventStatus, Role } from "../generated/prisma/enums.js";
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
  findPublishedEvents,
  softDeleteEvent,
  updateEvent,
  updateEventImage,
  upsertEventParticipation,
} from "../repositories/events.repository.js";
import { requireFile, requireId } from "../utils/request.js";
import { requireStudent } from "../utils/student.js";

const router = Router();

const requireEvent = async (id: string, adminView = false) => {
  const event = await findEventById(id);
  if (!event || event.deletedAt !== null) {
    throw new HttpNotFoundError("Event not found");
  }

  if (!adminView && event.status !== EventStatus.published) {
    throw new HttpNotFoundError("Event not found");
  }

  return event;
};

// ─── Public routes ────────────────────────────────────────────────────────────

router.get(ApiRoutes.events, async (_req, res) => {
  const events = await findPublishedEvents();
  res.json({ events });
});

router.get(ApiRoutes.event, async (req, res) => {
  const id = requireId(req);
  const event = await requireEvent(id);
  const { deletedAt: _d, updatedAt: _u, ...rest } = event;
  res.json({ event: rest });
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
    const { ticketUrl, endDate, ...rest } = validate(
      createEventSchema,
      req.body
    );

    const event = await createEvent({
      ...rest,
      startDate: new Date(rest.startDate),
      endDate: endDate ? new Date(endDate) : null,
      ticketUrl: ticketUrl || null,
    });

    res.status(201).json({ event });
  }
);

router.put(
  ApiRoutes.adminEvent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = requireId(req);
    await requireEvent(id, true);

    const { ticketUrl, endDate, startDate, ...rest } = validate(
      updateEventSchema,
      req.body
    );

    const updated = await updateEvent(id, {
      ...rest,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
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
    await requireEvent(id, true);
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
    const event = await requireEvent(id, true);

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
    await requireEvent(id, true);
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
    await requireEvent(id, true);

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
