import { test as base, expect } from "@playwright/test";

export { expect };

/**
 * Extended test fixture — add shared helpers (auth state, API clients, etc.) here
 * as the test suite grows.
 *
 * Usage:
 *   import { test, expect } from '@/fixtures';
 */
export const test = base.extend<{
  // Future: adminPage: Page   — pre-authenticated as admin
  // Future: studentPage: Page — pre-authenticated as student
}>({});
