import {
  createEventSchema,
  updateEventSchema,
  upsertEventParticipationSchema,
} from "@hakko/core";
import { Router, type Response } from "express";
import { EventStatus, Role } from "../generated/prisma/enums.js";
import { uploadEventImage } from "../lib/cloudinary.js";
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

const requireEvent = async (id: string, res: Response, adminView = false) => {
  const event = await findEventById(id);
  if (!event || event.deletedAt !== null) {
    res.status(404).json({ error: "Event not found" });
    return null;
  }

  if (!adminView && event.status !== EventStatus.published) {
    res.status(404).json({ error: "Event not found" });
    return null;
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
  const event = await requireEvent(id, res);
  if (!event) return;
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
    const parsed = validate(createEventSchema, req.body, res);
    if (!parsed) return;

    const { ticketUrl, endDate, ...rest } = parsed;

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
    const event = await requireEvent(id, res, true);
    if (!event) return;

    const parsed = validate(updateEventSchema, req.body, res);
    if (!parsed) return;

    const { ticketUrl, endDate, startDate, ...rest } = parsed;

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
    const event = await requireEvent(id, res, true);
    if (!event) return;

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
    try {
      const id = req.params.id as string;
      const event = await requireEvent(id, res, true);
      if (!event) return;

      if (!req.file) {
        res.status(400).json({ error: "No image file provided" });
        return;
      }

      const imageUrl = await uploadEventImage(req.file.buffer, id, event.image);

      await updateEventImage(id, imageUrl);

      res.json({ image: imageUrl });
    } catch (err) {
      console.error("[POST /api/admin/events/:id/image] Error:", err);
      res.status(500).json({ error: "Image upload failed" });
    }
  }
);

router.get(
  ApiRoutes.adminEventParticipants,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;
    const event = await requireEvent(id, res, true);
    if (!event) return;

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
    const event = await requireEvent(id, res, true);
    if (!event) return;

    const parsed = validate(upsertEventParticipationSchema, req.body, res);
    if (!parsed) return;

    const { userId, attended } = parsed;

    const user = await findStudentForEvent(userId);
    if (!user || user.role !== Role.student || user.deletedAt !== null) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    const participation = await upsertEventParticipation(id, userId, attended);
    res.status(200).json({ participation });
  }
);

export default router;
