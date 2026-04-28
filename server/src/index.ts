import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./lib/auth.js";
import { requireAuth } from "./middleware/requireAuth.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:5173";

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === CLIENT_URL) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
  }

  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Cookie"
    );
    res.status(204).end();
    return;
  }

  next();
});

// Better Auth handler must be mounted before express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/me", requireAuth, (req, res) => {
  res.json({ user: req.user, session: req.session });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
