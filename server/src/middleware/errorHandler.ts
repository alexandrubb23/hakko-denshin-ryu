import type { NextFunction, Request, Response } from "express";

/**
 * Global Express error handler — must be registered as the last middleware.
 *
 * Catches any unhandled error forwarded by async route handlers and returns a
 * consistent JSON `{ error }` response, preventing stack traces or HTML error
 * pages from leaking internal details to clients.
 */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);

  const status =
    err != null &&
    typeof err === "object" &&
    "status" in err &&
    typeof (err as { status: unknown }).status === "number"
      ? (err as { status: number }).status
      : 500;

  res.status(status).json({ error: "Internal server error" });
};
