import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { ALLOWED_ORIGINS, env } from "./env.js";
import { auth } from "./lib/auth.js";
import { ApiRoutes } from "./lib/routes.js";
import { requireAuth } from "./middleware/requireAuth.js";
import studentsRouter from "./routes/students.js";

const app = express();

// Security headers for all responses
app.use(
  helmet({
    // This is a JSON API server — disable CSP (not serving HTML)
    contentSecurityPolicy: false,
  })
);

// CORS — only allow requests from trusted origins (TRUSTED_ORIGINS env var)
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);

// Better Auth handler must be mounted before express.json()
app.all(ApiRoutes.authWildcard, toNodeHandler(auth));

app.use(express.json());

app.get(ApiRoutes.health, (_req, res) => {
  res.json({ status: "ok" });
});

app.get(ApiRoutes.me, requireAuth, (req, res) => {
  const { id, name, email, role, image, emailVerified } = req.user;
  res.json({ user: { id, name, email, role, image, emailVerified } });
});

app.use(studentsRouter);

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});
