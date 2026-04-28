import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./lib/auth.js";
import { requireAuth } from "./middleware/requireAuth.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

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
