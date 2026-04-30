import { createStudentSchema, updateStudentSchema } from "@hakko/core";
import { hashPassword } from "@better-auth/utils/password";
import { Router } from "express";
import { Role } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
import { ApiRoutes } from "../lib/routes.js";
import { validate } from "../lib/validate.js";
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
    const parsed = validate(createStudentSchema, req.body, res);
    if (!parsed) return;

    const { name, email, password } = parsed;

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

router.put(
  ApiRoutes.adminStudent,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const id = req.params.id as string;

    const student = await prisma.user.findUnique({ where: { id } });
    if (!student || student.role !== Role.student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    const parsed = validate(updateStudentSchema, req.body, res);
    if (!parsed) return;

    const { name, email, password } = parsed;

    if (email !== student.email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        res.status(409).json({ error: "Email already in use" });
        return;
      }
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { name, email },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (password) {
      const hashedPassword = await hashPassword(password);
      await prisma.account.updateMany({
        where: { userId: id, providerId: "credential" },
        data: { password: hashedPassword },
      });
    }

    res.json({ student: updated });
  }
);

export default router;
