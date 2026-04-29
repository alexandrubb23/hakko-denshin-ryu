import { defineConfig, devices } from "@playwright/test";

/**
 * Test ports are intentionally different from dev ports to avoid conflicts:
 *  - API:    3001 (dev uses 3000)
 *  - Client: 5174 (dev uses 5173)
 *
 * The API server runs with NODE_ENV=test so Bun auto-loads server/.env.test,
 * which points DATABASE_URL at the isolated `hakkoryu_test` database.
 */

const TEST_API_URL = "http://localhost:3001";
const TEST_CLIENT_URL = "http://localhost:5174";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./e2e/test-results",

  // Run test files sequentially — DB tests need isolation
  fullyParallel: false,
  workers: 1,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [["html", { open: "never" }]],

  use: {
    baseURL: TEST_CLIENT_URL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  globalSetup: "./e2e/global-setup.ts",
  globalTeardown: "./e2e/global-teardown.ts",

  webServer: [
    {
      // Express API — Bun auto-loads server/.env.test when NODE_ENV=test
      command: "bun run --cwd server dev",
      port: 3001,
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
      env: {
        NODE_ENV: "test",
        PORT: "3001",
      },
    },
    {
      // Client SSR server — must run from client/ so relative paths (./index.html,
      // ./dist/...) resolve correctly inside server.js
      command: "cd client && node server.js",
      port: 5174,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      env: {
        PORT: "5174",
        VITE_API_URL: TEST_API_URL,
      },
    },
  ],
});
