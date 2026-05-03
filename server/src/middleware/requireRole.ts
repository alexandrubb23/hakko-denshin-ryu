import type { RequestHandler } from "express";
import { Role } from "../generated/prisma/enums.js";
import { HttpForbiddenError } from "../lib/http-errors.js";

/**
 * Middleware factory that restricts a route to users holding one of the given roles.
 * Must be chained *after* requireAuth so that req.user is already populated.
 *
 * @example
 * app.get("/api/admin/students", requireAuth, requireRole(Role.admin), handler);
 */
export const requireRole =
  (...roles: Role[]): RequestHandler =>
  async (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role as Role)) {
      throw new HttpForbiddenError("Forbidden");
    }
    next();
  };
