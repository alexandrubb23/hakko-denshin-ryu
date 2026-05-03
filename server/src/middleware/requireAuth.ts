import { fromNodeHeaders } from "better-auth/node";
import type { RequestHandler } from "express";
import { auth } from "../lib/auth.js";
import { HttpUnauthorizedError } from "../lib/http-errors.js";

type User = typeof auth.$Infer.Session.user;
type Session = typeof auth.$Infer.Session;

declare global {
  namespace Express {
    interface Request {
      session: Session;
      user: User;
    }
  }
}

export const requireAuth: RequestHandler = async (req, _res, next) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    throw new HttpUnauthorizedError("Unauthorized");
  }

  req.session = session;
  req.user = session.user;
  next();
};
