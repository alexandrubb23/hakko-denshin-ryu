import { Router } from "express";
import { techniques } from "../data/techniques.js";
import { ApiRoutes } from "../lib/routes.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get(ApiRoutes.techniques, requireAuth, (_req, res) => {
  res.json({ techniques });
});

export default router;
