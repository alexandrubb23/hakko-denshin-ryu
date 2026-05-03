import {
  createEventSchema,
  updateEventSchema,
  upsertEventParticipationSchema,
} from "@hakko/core";
import { Router } from "express";
import { EventStatus, Role } from "../generated/prisma/enums.js";
import { uploadEventImage } from "../lib/cloudinary.js";
import { HttpBadRequestError, HttpNotFoundError } from "../lib/http-errors.js";
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
  findStudentForEvent,
  softDeleteEvent,
  updateEvent,
  updateEventImage,
  upsertEventParticipation,
} from "../repositories/events.repository.js";

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
  const id = req.params.id as string;
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
    const id = req.params.id as string;
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
    const id = req.params.id as string;
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
    const id = req.params.id as string;
    const event = await requireEvent(id, true);

    if (!req.file) throw new HttpBadRequestError("No image file provided");

    const imageUrl = await uploadEventImage(req.file.buffer, id, event.image);
    await updateEventImage(id, imageUrl);

    res.json({ image: imageUrl });
  }
);

router.get(
  ApiRoutes.adminEventParticipants,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;
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
    const id = req.params.id as string;
    await requireEvent(id, true);

    const { userId, attended } = validate(
      upsertEventParticipationSchema,
      req.body
    );

    const user = await findStudentForEvent(userId);
    if (!user || user.role !== Role.student || user.deletedAt !== null) {
      throw new HttpNotFoundError("Student not found");
    }

    const participation = await upsertEventParticipation(id, userId, attended);
    res.status(200).json({ participation });
  }
);

export default router;
