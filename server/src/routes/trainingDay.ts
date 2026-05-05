import { Router } from "express";
import { Role } from "../generated/prisma/enums.js";
import { HttpBadRequestError } from "../lib/http-errors.js";
import { ApiRoutes } from "../lib/routes.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { findAttendanceForDate } from "../repositories/students.repository.js";
import { DATE_REGEX } from "../utils/query-params.js";

const router = Router();

router.get(
  ApiRoutes.adminTrainingDayAttendance,
  requireAuth,
  requireRole(Role.admin),
  async (req, res) => {
    const rawDate = req.query.date as string | undefined;

    if (!rawDate || !DATE_REGEX.test(rawDate)) {
      throw new HttpBadRequestError(
        "Missing or invalid date. Expected format: YYYY-MM-DD"
      );
    }

    const date = new Date(`${rawDate}T00:00:00.000Z`);
    const records = await findAttendanceForDate(date);

    res.json({ records });
  }
);

export default router;
