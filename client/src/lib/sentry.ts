import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const sentryEnvironment = import.meta.env.VITE_SENTRY_ENVIRONMENT as
  | string
  | undefined;

/**
 * Initialises Sentry for the browser.
 * Active whenever VITE_SENTRY_DSN and VITE_SENTRY_ENVIRONMENT are both set.
 * Set VITE_SENTRY_ENVIRONMENT to "development", "staging", or "production".
 */
export function initSentry(): void {
  if (!dsn || !sentryEnvironment) return;

  Sentry.init({
    dsn,
    environment: sentryEnvironment,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

export { Sentry };
