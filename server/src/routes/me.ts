import { toUtcDate } from "@hakko/core";
import { Router } from "express";
import { uploadAvatar } from "../lib/cloudinary.js";
import { prisma } from "../lib/prisma.js";
import { ApiRoutes } from "../lib/routes.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { uploadMiddleware } from "../middleware/upload.js";

const MIN_MONTH = 1;
const MAX_MONTH = 12;

const router = Router();

router.get(ApiRoutes.me, requireAuth, (req, res) => {
  const { id, name, email, role, image, emailVerified, createdAt } = req.user;
  res.json({
    user: { id, name, email, role, image, emailVerified, createdAt },
  });
});

router.get(ApiRoutes.meRanks, requireAuth, async (req, res) => {
  const ranks = await prisma.studentRank.findMany({
    where: { userId: req.user.id, deletedAt: null },
    select: {
      id: true,
      rankId: true,
      awardedAt: true,
      notes: true,
      rank: {
        select: { name: true, belt: true, order: true },
      },
    },
    orderBy: { awardedAt: "desc" },
  });
  res.json({ ranks });
});

router.get(ApiRoutes.meAttendance, requireAuth, async (req, res) => {
  const yearParam = req.query.year as string | undefined;
  const monthParam = req.query.month as string | undefined;

  const year = Number(yearParam);

  if (!yearParam || isNaN(year)) {
    res.status(400).json({
      error: "year query parameter is required and must be a number",
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

  const records = await prisma.studentAttendance.findMany({
    where: { userId: req.user.id, date: { gte: from, lt: to } },
    select: { id: true, date: true, attended: true },
    orderBy: { date: "asc" },
  });

  res.json({ records });
});

router.get(ApiRoutes.meEvents, requireAuth, async (req, res) => {
  const events = await prisma.event.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      name: true,
      type: true,
      status: true,
      startDate: true,
      endDate: true,
      location: true,
      participants: {
        where: { userId: req.user.id },
        select: { attended: true },
        take: 1,
      },
    },
    orderBy: { startDate: "asc" },
  });

  const result = events.map(({ participants, ...event }) => ({
    ...event,
    attended: participants[0]?.attended ?? null,
  }));

  res.json({ events: result });
});

router.post(
  ApiRoutes.meImage,
  requireAuth,
  uploadMiddleware,
  async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No image file provided" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { image: true },
      });

      const imageUrl = await uploadAvatar(
        req.file.buffer,
        req.user.id,
        user?.image
      );

      await prisma.user.update({
        where: { id: req.user.id },
        data: { image: imageUrl },
      });

      res.json({ image: imageUrl });
    } catch (err) {
      console.error("[POST /api/me/image] Error:", err);
      res.status(500).json({ error: "Image upload failed" });
    }
  }
);

export default router;
