import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import type { Application } from "express";
import express from "express";
import helmet from "helmet";
import { ALLOWED_ORIGINS } from "../env.js";
import { auth } from "../lib/auth.js";
import { ApiRoutes } from "../lib/routes.js";

export function applyMiddleware(app: Application): void {
  // Security headers for all responses
  app.use(
    helmet({
      // This is a JSON API server — disable CSP (not serving HTML)
      contentSecurityPolicy: false,
    }),
  );

  // CORS — only allow requests from trusted origins (TRUSTED_ORIGINS env var)
  app.use(
    cors({
      origin: ALLOWED_ORIGINS,
      credentials: true,
    }),
  );

  // Better Auth handler must be mounted before express.json()
  app.all(ApiRoutes.authWildcard, toNodeHandler(auth));

  app.use(express.json());
}
