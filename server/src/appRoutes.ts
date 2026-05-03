import type { Application } from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import dashboardRouter from "./routes/dashboard.js";
import eventsRouter from "./routes/events.js";
import healthRouter from "./routes/health.js";
import inviteRouter from "./routes/invite.js";
import kyuProgramRouter from "./routes/kyuProgram.js";
import meRouter from "./routes/me.js";
import studentsRouter from "./routes/students.js";
import techniquesRouter from "./routes/techniques.js";

export function appRoutes(app: Application): void {
  app.use(healthRouter);
  app.use(meRouter);
  app.use(dashboardRouter);
  app.use(kyuProgramRouter);
  app.use(eventsRouter);
  app.use(studentsRouter);
  app.use(techniquesRouter);
  app.use(inviteRouter);

  // Catch-all 404 — must be before the error handler.
  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  // Global error handler — must be registered last.
  app.use(errorHandler);
}
