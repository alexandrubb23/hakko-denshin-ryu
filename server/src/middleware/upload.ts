import type { NextFunction, Request, Response } from "express";
import { fileTypeFromBuffer } from "file-type";
import multer from "multer";

const FIVE_MB = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const multerInstance = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: FIVE_MB },
  // First-pass check: fast reject based on the client-declared Content-Type.
  // A second, authoritative check is done against the file's magic bytes below.
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
 *
 * After multer buffers the file a magic-bytes check is performed via `file-type`
 * so that a spoofed Content-Type header cannot bypass the MIME validation.
 */
export const uploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  multerInstance.single("image")(req, res, (err) => {
    if (err) {
      const status =
        err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE"
          ? 413
          : 400;
      res.status(status).json({ error: err.message });
      return;
    }

    if (!req.file) {
      next();
      return;
    }

    // Authoritative MIME check: inspect the actual file signature (magic bytes)
    // rather than the client-supplied Content-Type, which is trivially spoofable.
    fileTypeFromBuffer(req.file.buffer)
      .then((type) => {
        if (!type || !ALLOWED_MIME_TYPES.has(type.mime)) {
          res
            .status(400)
            .json({ error: "Only JPEG, PNG, and WebP images are allowed" });
          return;
        }
        next();
      })
      .catch(next);
  });
};
