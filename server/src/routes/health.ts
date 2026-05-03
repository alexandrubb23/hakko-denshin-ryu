import { Router } from "express";
import { ApiRoutes } from "../lib/routes.js";

const router = Router();

router.get(ApiRoutes.health, (_req, res) => {
  res.json({ status: "ok" });
});

export default router;
