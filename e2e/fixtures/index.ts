import { test as base, expect, type Browser, type Page } from "@playwright/test";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";

export { expect };

export const ADMIN_CREDENTIALS = {
  email: "admin@test.com",
  password: "admin-test-password-123",
  name: "Admin",
} as const;

export const STUDENT_CREDENTIALS = {
  email: "student@test.com",
  password: "student-test-password-123",
  name: "Test Student",
} as const;

const SERVER_DIR = path.join(process.cwd(), "server");

function loadEnvFile(filePath: string): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const line of readFileSync(filePath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    vars[key] = val;
  }
  return vars;
}

/** Fills the login form fields without submitting. */
export async function fillLoginForm(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
}

/** Fills the login form and clicks Submit — does NOT wait for navigation. */
export async function submitLoginForm(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await fillLoginForm(page, email, password);
  await page.getByRole("button", { name: "Sign In" }).click();
}

/** Clicks the Sign Out button and waits for the /login redirect. */
export async function logoutViaUi(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Sign Out" }).click();
  await page.waitForURL("/login");
}

async function loginViaUi(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.goto("/login");
  // Wait for the form — the page shows a spinner while useSession isPending.
  await page.getByLabel("Email").waitFor({ state: "visible" });
  await submitLoginForm(page, email, password);
  await page.waitForURL("/dashboard");
}

async function createAuthenticatedPage(
  browser: Browser,
  email: string,
  password: string
) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await loginViaUi(page, email, password);
  return { page, context };
}

/**
 * Extended test fixture — add shared helpers (auth state, API clients, etc.) here
 * as the test suite grows.
 *
 * Usage:
 *   import { test, expect } from './fixtures';
 */
export const test = base.extend<{
  loginAsAdmin: (page: Page) => Promise<void>;
  adminPage: Page;
  studentPage: Page;
}>({
  loginAsAdmin: async ({}, use) => {
    await use((page) =>
      loginViaUi(page, ADMIN_CREDENTIALS.email, ADMIN_CREDENTIALS.password)
    );
  },

  adminPage: async ({ browser }, use) => {
    const { page, context } = await createAuthenticatedPage(
      browser,
      ADMIN_CREDENTIALS.email,
      ADMIN_CREDENTIALS.password
    );
    await use(page);
    await context.close();
  },

  studentPage: async ({ browser }, use) => {
    const testEnv = loadEnvFile(path.join(SERVER_DIR, ".env.test"));
    const env = { ...process.env, NODE_ENV: "test", ...testEnv };
    execSync("bun run db:seed:test-student", { cwd: SERVER_DIR, env, stdio: "inherit" });

    const { page, context } = await createAuthenticatedPage(
      browser,
      STUDENT_CREDENTIALS.email,
      STUDENT_CREDENTIALS.password
    );
    await use(page);
    await context.close();
  },
});
