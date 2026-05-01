import { Router } from "express";
import { kyuProgram } from "../data/kyuProgram.js";
import { ApiRoutes } from "../lib/routes.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get(ApiRoutes.kyuProgram, requireAuth, (_req, res) => {
  res.json({ kyuProgram });
});

export default router;
