import { createStudentSchema } from "@hakko/core";
import { hashPassword } from "@better-auth/utils/password";
import { Router } from "express";
import { Role } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
import { ApiRoutes } from "../lib/routes.js";
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

router.post(
  ApiRoutes.adminStudents,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const parsed = createStudentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten().fieldErrors });
      return;
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const id = crypto.randomUUID();
    const hashedPassword = await hashPassword(password);

    const student = await prisma.user.create({
      data: {
        id,
        name,
        email,
        emailVerified: false,
        role: Role.student,
        accounts: {
          create: {
            id: crypto.randomUUID(),
            accountId: id,
            providerId: "credential",
            password: hashedPassword,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    res.status(201).json({ student });
  }
);

export default router;
