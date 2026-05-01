import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { ALLOWED_ORIGINS, env } from "./env.js";
import { auth } from "./lib/auth.js";
import { ApiRoutes } from "./lib/routes.js";
import kyuProgramRouter from "./routes/kyuProgram.js";
import meRouter from "./routes/me.js";
import studentsRouter from "./routes/students.js";
import techniquesRouter from "./routes/techniques.js";

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

app.use(meRouter);
app.use(kyuProgramRouter);
app.use(studentsRouter);
app.use(techniquesRouter);

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});
