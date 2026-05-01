import { Router } from "express";
import { uploadAvatar } from "../lib/cloudinary.js";
import { prisma } from "../lib/prisma.js";
import { ApiRoutes } from "../lib/routes.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { uploadMiddleware } from "../middleware/upload.js";

const router = Router();

router.get(ApiRoutes.me, requireAuth, (req, res) => {
  const { id, name, email, role, image, emailVerified } = req.user;
  res.json({ user: { id, name, email, role, image, emailVerified } });
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
