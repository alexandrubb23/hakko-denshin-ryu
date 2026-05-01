import type { NextFunction, Request, Response } from "express";
import multer from "multer";

const FIVE_MB = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const multerInstance = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: FIVE_MB },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and WebP images are allowed"));
    }
  },
});

/**
 * Promise-based wrapper around multer's `.single()` so it integrates cleanly
 * with Express 5 async route handlers and surfaces multer errors as HTTP 400s
 * instead of unhandled 500s.
 */
export const uploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  multerInstance.single("image")(req, res, (err) => {
    if (!err) return next();

    const status =
      err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE"
        ? 413
        : 400;

    res.status(status).json({ error: err.message });
  });
};
