import { toUtcDate } from "@hakko/core";
import { Router } from "express";
import { uploadAvatar } from "../lib/cloudinary.js";
import { ApiRoutes } from "../lib/routes.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { uploadMiddleware } from "../middleware/upload.js";
import {
  findMyAttendance,
  findMyEvents,
  findMyRanks,
  findUserImageById,
  updateUserImageById,
} from "../repositories/me.repository.js";

const MIN_MONTH = 1;
const MAX_MONTH = 12;
const MIN_YEAR = 2000;
const MAX_YEAR = new Date().getUTCFullYear() + 1;

const router = Router();

router.get(ApiRoutes.me, requireAuth, (req, res) => {
  const { id, name, email, role, image, emailVerified, createdAt } = req.user;
  res.json({
    user: { id, name, email, role, image, emailVerified, createdAt },
  });
});

router.get(ApiRoutes.meRanks, requireAuth, async (req, res) => {
  const ranks = await findMyRanks(req.user.id);
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

  if (year < MIN_YEAR || year > MAX_YEAR) {
    res.status(400).json({
      error: `year must be between ${MIN_YEAR} and ${MAX_YEAR}`,
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

  const records = await findMyAttendance(req.user.id, from, to);
  res.json({ records });
});

router.get(ApiRoutes.meEvents, requireAuth, async (req, res) => {
  const events = await findMyEvents(req.user.id);
  res.json({ events });
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

      const user = await findUserImageById(req.user.id);

      const imageUrl = await uploadAvatar(
        req.file.buffer,
        req.user.id,
        user?.image
      );

      await updateUserImageById(req.user.id, imageUrl);

      res.json({ image: imageUrl });
    } catch (err) {
      console.error("[POST /api/me/image] Error:", err);
      res.status(500).json({ error: "Image upload failed" });
    }
  }
);

export default router;
