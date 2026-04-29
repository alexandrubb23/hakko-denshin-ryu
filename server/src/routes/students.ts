import { Router } from "express";
import { Role } from "../generated/prisma/enums.js";
import { ApiRoutes } from "../lib/routes.js";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router();

router.get(
  ApiRoutes.adminStudents,
  requireAuth,
  requireRole(Role.admin),
  async (_req, res) => {
    const students = await prisma.user.findMany({
      where: { role: Role.student },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: { name: "asc" },
    });

    res.json({ students });
  }
);

export default router;
