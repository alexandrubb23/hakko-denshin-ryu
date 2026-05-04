import { Request } from "express";
import { HttpBadRequestError } from "../lib/http-errors.js";

/**
 * Asserts that `req.file` is present (uploaded via `uploadMiddleware`).
 * Throws `HttpBadRequestError` if no file was provided.
 * Returns the file so callers can access it in a type-safe, non-nullable way.
 */
export function requireFile(req: Request): Express.Multer.File {
  if (!req.file) throw new HttpBadRequestError("No image file provided");
  return req.file;
}
