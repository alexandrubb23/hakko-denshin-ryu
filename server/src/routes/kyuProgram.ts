import { Router } from "express";
import { kyuProgram } from "../data/kyuProgram.js";
import { ApiRoutes } from "../lib/routes.js";

const router = Router();

// Public: the kyu program is also shown on the public /hakko-denshin-ryu page
router.get(ApiRoutes.kyuProgram, (_req, res) => {
  res.json({ kyuProgram });
});

export default router;
