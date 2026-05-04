/**
 * E2E tests for the "Set Password via Invitation Token" feature.
 *
 * Only the CRUD happy path is covered here.
 * Error states and form validation are covered by component unit tests.
 */

import { readFileSync } from "fs";
import path from "path";

import { PrismaClient } from "../server/src/generated/prisma/client.js";
import { Role } from "../server/src/generated/prisma/enums.js";
import { hashToken } from "../server/src/lib/token.js";
import { expect, submitLoginForm, test } from "./fixtures";

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVER_DIR = path.join(process.cwd(), "server");

// ─── DB helpers ───────────────────────────────────────────────────────────────

function createTestPrismaClient(): PrismaClient {
  const envPath = path.join(SERVER_DIR, ".env.test");
  const vars: Record<string, string> = {};
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed
      .slice(eqIdx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    vars[key] = val;
  }
  process.env.DATABASE_URL = vars["DATABASE_URL"];
  return new PrismaClient();
}

function generateTokenPair(): { plainToken: string; tokenHash: string } {
  const plainToken = hashToken(String(Math.random()));
  return { plainToken, tokenHash: hashToken(plainToken) };
}

interface SeedInviteResult {
  userId: string;
  plainToken: string;
  name: string;
  email: string;
}

async function seedInvitedStudent(
  prisma: PrismaClient
): Promise<SeedInviteResult> {
  const ts = Date.now();
  const name = `Invited Student ${ts}`;
  const email = `invited.${ts}@example.com`;

  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name,
      email,
      emailVerified: false,
      role: Role.student,
    },
  });

  const { plainToken, tokenHash } = generateTokenPair();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await prisma.invitationToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  return { userId: user.id, plainToken, name, email };
}

async function cleanupUser(prisma: PrismaClient, userId: string) {
  await prisma.user.delete({ where: { id: userId } }).catch(() => {});
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe("Set Password via Invitation Token", () => {
  let prisma: PrismaClient;

  test.beforeAll(() => {
    prisma = createTestPrismaClient();
  });

  test.afterAll(async () => {
    await prisma.$disconnect();
  });

  test("should show success screen after setting a valid password", async ({
    page,
  }) => {
    const { userId, plainToken } = await seedInvitedStudent(prisma);

    try {
      await page.goto(`/set-password?token=${plainToken}`);
      await page
        .getByRole("heading", { name: "Set your password" })
        .waitFor({ state: "visible" });

      await page
        .getByLabel("Password", { exact: true })
        .fill("NewSecurePass1!");
      await page.getByLabel("Confirm Password").fill("NewSecurePass1!");
      await page.getByRole("button", { name: "Set password" }).click();

      await expect(page.getByText("Your password has been set")).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Go to login" })
      ).toBeVisible();
    } finally {
      await cleanupUser(prisma, userId);
    }
  });

  test("should allow the student to log in with the newly set password", async ({
    page,
  }) => {
    const newPassword = "NewSecurePass1!";
    const { userId, plainToken, email } = await seedInvitedStudent(prisma);

    try {
      await page.goto(`/set-password?token=${plainToken}`);
      await page
        .getByRole("heading", { name: "Set your password" })
        .waitFor({ state: "visible" });

      await page.getByLabel("Password", { exact: true }).fill(newPassword);
      await page.getByLabel("Confirm Password").fill(newPassword);
      await page.getByRole("button", { name: "Set password" }).click();

      await expect(page.getByText("Your password has been set")).toBeVisible();

      await page.goto("/login");
      await page.getByLabel("Email").waitFor({ state: "visible" });
      await submitLoginForm(page, email, newPassword);

      await expect(page).toHaveURL("/dashboard");
    } finally {
      await cleanupUser(prisma, userId);
    }
  });
});
