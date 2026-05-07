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
import { parseYearMonthParams } from "../utils/query-params.js";
import { requireFile } from "../utils/request.js";

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
  const { from, to } = parseYearMonthParams(
    req.query.year as string | undefined,
    req.query.month as string | undefined,
  );

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
    const file = requireFile(req);

    const user = await findUserImageById(req.user.id);

    const imageUrl = await uploadAvatar(file.buffer, req.user.id, user?.image);

    await updateUserImageById(req.user.id, imageUrl);

    res.json({ image: imageUrl });
  },
);

export default router;
