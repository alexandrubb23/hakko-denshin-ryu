import * as Sentry from "@sentry/node";
import { env } from "../env.js";

/**
 * Initialises Sentry. Must be called before any other imports in the entry point.
 * Active whenever SENTRY_DSN and SENTRY_ENVIRONMENT are both set.
 * Set SENTRY_ENVIRONMENT to "development", "staging", or "production".
 */
export function initSentry(): void {
  if (!env.SENTRY_DSN || !env.SENTRY_ENVIRONMENT) return;

  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.SENTRY_ENVIRONMENT,
    tracesSampleRate: 0.2,
  });
}

export { Sentry };
