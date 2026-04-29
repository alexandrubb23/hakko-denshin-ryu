import type { RequestHandler } from "express";
import { Role } from "../generated/prisma/enums.js";

/**
 * Middleware factory that restricts a route to users holding one of the given roles.
 * Must be chained *after* requireAuth so that req.user is already populated.
 *
 * @example
 * app.get("/api/admin/students", requireAuth, requireRole(Role.admin), handler);
 */
export const requireRole = (...roles: Role[]): RequestHandler =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role as Role)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };
