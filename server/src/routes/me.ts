import { toUtcDate } from "@hakko/core";
import { Router } from "express";
import { uploadAvatar } from "../lib/cloudinary.js";
import {
  MAX_MONTH,
  MAX_YEAR,
  MIN_MONTH,
  MIN_YEAR,
} from "../lib/date-bounds.js";
import { HttpBadRequestError } from "../lib/http-errors.js";
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
    throw new HttpBadRequestError(
      "year query parameter is required and must be a number"
    );
  }

  if (year < MIN_YEAR || year > MAX_YEAR) {
    throw new HttpBadRequestError(
      `year must be between ${MIN_YEAR} and ${MAX_YEAR}`
    );
  }

  let from: Date;
  let to: Date;

  if (monthParam !== undefined) {
    const month = Number(monthParam);
    if (isNaN(month) || month < MIN_MONTH || month > MAX_MONTH) {
      throw new HttpBadRequestError(
        `month must be between ${MIN_MONTH} and ${MAX_MONTH}`
      );
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
    if (!req.file) throw new HttpBadRequestError("No image file provided");

    const user = await findUserImageById(req.user.id);

    const imageUrl = await uploadAvatar(
      req.file.buffer,
      req.user.id,
      user?.image
    );

    await updateUserImageById(req.user.id, imageUrl);

    res.json({ image: imageUrl });
  }
);

export default router;
