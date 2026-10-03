import { Router } from "express";
import { techniques } from "../data/techniques.js";
import { ApiRoutes } from "../lib/routes.js";

const router = Router();

// Public: the syllabus is also shown on the public /hakko-ryu page
router.get(ApiRoutes.techniques, (_req, res) => {
  res.json({ techniques });
});

export default router;
