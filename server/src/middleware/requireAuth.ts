import { fromNodeHeaders } from "better-auth/node";
import type { RequestHandler } from "express";
import { auth } from "../lib/auth.js";

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

export const requireAuth: RequestHandler = async (req, res, next) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.session = session;
  req.user = session.user;
  next();
};
