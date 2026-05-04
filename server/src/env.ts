import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const WEAK_SECRETS = new Set([
  "your-secret-here",
  "change-me",
  "secret",
  "REPLACE_THIS_WITH_OUTPUT_OF_openssl_rand_-base64_32",
]);

export const env = createEnv({
  /**
   * Server-side environment variables schema.
   * Validated at startup — the server will refuse to start if any are missing or invalid.
   */
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z
      .string()
      .min(
        32,
        "BETTER_AUTH_SECRET must be at least 32 characters. Generate with: openssl rand -base64 32"
      )
      .refine(
        (val) => !WEAK_SECRETS.has(val),
        "BETTER_AUTH_SECRET is a placeholder. Generate with: openssl rand -base64 32"
      ),
    SERVER_URL: z.string().url().default("http://localhost:3000"),
    BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
    CLIENT_URL: z.string().url().default("http://localhost:5173"),
    TRUSTED_ORIGINS: z.string().default("http://localhost:5173"),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    SENDGRID_API_KEY: z.string().min(1),
    SENDGRID_FROM_EMAIL: z.email().default("noreply@hakko-denshin-ryu.com"),
    SENTRY_DSN: z.string().url().optional(),
    SENTRY_ENVIRONMENT: z.string().optional(),
  },

  /**
   * Runtime values for each env var.
   * Using runtimeEnvStrict ensures every schema key is explicitly listed here — a type error
   * will surface if you add a variable to `server` but forget to wire it up here.
   */
  runtimeEnvStrict: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    SERVER_URL: process.env.SERVER_URL,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    TRUSTED_ORIGINS: process.env.TRUSTED_ORIGINS,
    NODE_ENV: process.env.NODE_ENV,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
  },

  /**
   * Run with SKIP_ENV_VALIDATION=1 to skip validation (e.g. during Docker builds).
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Treat empty strings as undefined so that `VAR=` in .env behaves the same as omitting VAR.
   */
  emptyStringAsUndefined: true,
});

/**
 * Parsed list of allowed CORS/auth origins, derived from TRUSTED_ORIGINS.
 * Single source of truth for both the CORS middleware and Better Auth.
 */
export const ALLOWED_ORIGINS = env.TRUSTED_ORIGINS.split(",").map((s) =>
  s.trim()
);
