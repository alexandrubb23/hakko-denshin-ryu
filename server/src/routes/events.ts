import {
  createEventSchema,
  updateEventSchema,
  upsertEventParticipationSchema,
} from "@hakko/core";
import { Router, type Response } from "express";
import { EventStatus, Role } from "../generated/prisma/enums.js";
import { uploadEventImage } from "../lib/cloudinary.js";
import { prisma } from "../lib/prisma.js";
import { ApiRoutes } from "../lib/routes.js";
import { validate } from "../lib/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { uploadMiddleware } from "../middleware/upload.js";

const router = Router();

const EVENT_PUBLIC_SELECT = {
  id: true,
  name: true,
  type: true,
  status: true,
  startDate: true,
  endDate: true,
  location: true,
  details: true,
  ticketUrl: true,
  image: true,
  createdAt: true,
} as const;

const requireEvent = async (id: string, res: Response, adminView = false) => {
  const event = await prisma.event.findUnique({ where: { id } });
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
  const events = await prisma.event.findMany({
    where: { status: EventStatus.published, deletedAt: null },
    select: EVENT_PUBLIC_SELECT,
    orderBy: { startDate: "asc" },
  });
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
    const events = await prisma.event.findMany({
      where: { deletedAt: null },
      select: { ...EVENT_PUBLIC_SELECT, updatedAt: true },
      orderBy: { startDate: "asc" },
    });
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

    const event = await prisma.event.create({
      data: {
        ...rest,
        startDate: new Date(rest.startDate),
        endDate: endDate ? new Date(endDate) : null,
        ticketUrl: ticketUrl || null,
      },
      select: EVENT_PUBLIC_SELECT,
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

    const updated = await prisma.event.update({
      where: { id },
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        ticketUrl: ticketUrl || null,
      },
      select: EVENT_PUBLIC_SELECT,
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

    await prisma.event.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

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

      await prisma.event.update({ where: { id }, data: { image: imageUrl } });

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

    const participants = await prisma.eventParticipation.findMany({
      where: { eventId: id },
      select: {
        id: true,
        attended: true,
        userId: true,
        user: { select: { name: true, email: true, image: true } },
      },
      orderBy: { user: { name: "asc" } },
    });

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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, deletedAt: true },
    });
    if (!user || user.role !== Role.student || user.deletedAt !== null) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    const participation = await prisma.eventParticipation.upsert({
      where: { eventId_userId: { eventId: id, userId } },
      create: { eventId: id, userId, attended },
      update: { attended },
      select: {
        id: true,
        attended: true,
        userId: true,
        user: { select: { name: true, email: true, image: true } },
      },
    });

    res.status(200).json({ participation });
  }
);

export default router;
