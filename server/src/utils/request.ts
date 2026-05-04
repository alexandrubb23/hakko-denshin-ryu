import { Request } from "express";
import { HttpBadRequestError } from "../lib/http-errors.js";

// Accepts cuid (app entities: clh3n7l5k0000…) and UUID (Better Auth user ids)
const VALID_ID = /^[a-z0-9][a-z0-9-]{19,}$/i;

/**
 * Reads and validates a route param as a DB id (cuid or UUID).
 * Throws `HttpBadRequestError` if the value is missing or has an invalid format.
 */
export function requireId(req: Request, param = "id"): string {
  const raw = req.params[param];
  const id = Array.isArray(raw) ? raw[0] : raw;
  if (!id || !VALID_ID.test(id)) {
    throw new HttpBadRequestError(`Invalid ${param} format`);
  }
  return id;
}

/**
 * Asserts that `req.file` is present (uploaded via `uploadMiddleware`).
 * Throws `HttpBadRequestError` if no file was provided.
 * Returns the file so callers can access it in a type-safe, non-nullable way.
 */
export function requireFile(req: Request): Express.Multer.File {
  if (!req.file) throw new HttpBadRequestError("No image file provided");
  return req.file;
}
