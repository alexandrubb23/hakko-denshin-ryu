import { execSync } from "child_process";
import path from "path";

import {
  createStudentViaUI,
  expect,
  newStudent,
  test,
  type Page,
} from "./fixtures";
import { loadEnvFile } from "./helpers/env";

const SERVER_DIR = path.join(process.cwd(), "server");

/**
 * A known **past** Tuesday used to mock the browser clock so that
 * `new Date().getDay() === 2` (Tuesday) when the Dashboard component renders,
 * causing the "Training Day" button to appear.
 *
 * We deliberately use a past date because the server rejects attendance records
 * with a future date (`"Cannot mark attendance for future dates"`).
 *
 * May 6, 2025 is a Tuesday (day index 2 in JS Date).
 * It is intentionally chosen to avoid conflicts with `student-attendance.spec.ts`,
 * which uses April 29, 2025 (and its ISO week / April month view).
 */
const TRAINING_DATE = "2025-05-06";
const TRAINING_DAY = new Date(`${TRAINING_DATE}T12:00:00`);

/**
 * Waits for a successful POST to the per-student attendance endpoint.
 * Must be set up BEFORE the action that triggers the request.
 */
function waitForAttendancePost(page: Page) {
  return page.waitForResponse(
    (r) =>
      r.url().includes("/attendance") &&
      r.request().method() === "POST" &&
      r.status() === 200
  );
}

test.describe("Training Day Attendance", () => {
  /**
   * Before any test in this describe block runs, wipe all StudentAttendance
   * records for TRAINING_DAY so cross-spec DB contamination cannot affect
   * the baseline assumptions (both buttons outlined, chip = 0).
   */
  test.beforeAll(() => {
    const testEnv = loadEnvFile(path.join(SERVER_DIR, ".env.test"));
    const env = {
      ...process.env,
      NODE_ENV: "test",
      ...testEnv,
      CLEAR_DATE: TRAINING_DATE,
    };
    execSync("bun run db:clear:attendance", {
      cwd: SERVER_DIR,
      env,
      stdio: "inherit",
    });
  });

  /**
   * Common setup for every test:
   *  1. Mock the browser clock to a past Tuesday before any navigation so
   *     `new Date().getDay() === 2` when the Dashboard component hydrates.
   *  2. Log in as admin.
   *  3. Create one student (so the modal has at least one row to interact with).
   *  4. Navigate to the Admin Dashboard and wait for the "Training Day" button.
   *  5. Open the TrainingDayModal and wait until the student list is visible.
   */
  test.beforeEach(async ({ page, loginAsAdmin }) => {
    // Step 1 — install fake clock BEFORE any navigation
    await page.clock.install({ time: TRAINING_DAY });

    // Step 2 — log in (navigates /login → /dashboard automatically)
    await loginAsAdmin(page);

    // Step 3 — create a fresh student so the modal always has data
    await page.goto("/students");
    await page
      .getByRole("heading", { name: "Students" })
      .waitFor({ state: "visible" });
    await createStudentViaUI(page, newStudent());

    // Step 4 — go back to the dashboard and wait for the "Training Day" button.
    // The button is rendered both at desktop (display: sm) and mobile (display: xs),
    // so we target the first visible instance.
    await page.goto("/dashboard");
    const trainingDayBtn = page
      .getByRole("button", { name: "Training Day" })
      .first();
    await trainingDayBtn.waitFor({ state: "visible" });

    // Step 5 — open the modal and wait for the student list to fully load
    await trainingDayBtn.click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    await dialog
      .getByRole("button", { name: "Yes" })
      .first()
      .waitFor({ state: "visible" });
  });

  // ── View ──────────────────────────────────────────────────────────────────

  test("should display the modal with title, student list, and attended count chip", async ({
    page,
  }) => {
    const dialog = page.getByRole("dialog");

    // Modal heading
    await expect(dialog.getByText("Training Attendance")).toBeVisible();

    // At least one student row (ParticipantsList renders <ul> + <li> items)
    await expect(dialog.getByRole("listitem").first()).toBeVisible();

    // Attended count chip is visible and starts at 0 (no records exist yet)
    const countChip = dialog.locator(".MuiChip-label");
    await expect(countChip).toBeVisible();
    await expect(countChip).toHaveText("0");
  });

  // ── Mark as present ───────────────────────────────────────────────────────

  test("should mark a student as present when clicking Yes", async ({
    page,
  }) => {
    const dialog = page.getByRole("dialog");
    const firstRow = dialog.getByRole("listitem").first();
    const yesBtn = firstRow.getByRole("button", { name: "Yes" });
    const noBtn = firstRow.getByRole("button", { name: "No" });

    // Baseline: both buttons start outlined (no record exists yet)
    await expect(yesBtn).toHaveClass(/MuiButton-outlined/);
    await expect(noBtn).toHaveClass(/MuiButton-outlined/);

    await Promise.all([waitForAttendancePost(page), yesBtn.click()]);

    // Yes becomes active (contained / green), No remains outlined
    await expect(yesBtn).toHaveClass(/MuiButton-contained/);
    await expect(noBtn).toHaveClass(/MuiButton-outlined/);

    // Attended count chip increments to 1
    await expect(dialog.locator(".MuiChip-label")).toHaveText("1");
  });

  // ── Mark as absent ────────────────────────────────────────────────────────

  test("should mark a student as absent when clicking No", async ({ page }) => {
    const dialog = page.getByRole("dialog");
    const firstRow = dialog.getByRole("listitem").first();
    const yesBtn = firstRow.getByRole("button", { name: "Yes" });
    const noBtn = firstRow.getByRole("button", { name: "No" });

    await Promise.all([waitForAttendancePost(page), noBtn.click()]);

    // No becomes active (contained / red), Yes remains outlined
    await expect(noBtn).toHaveClass(/MuiButton-contained/);
    await expect(yesBtn).toHaveClass(/MuiButton-outlined/);

    // Marking absent must not increment the attended count
    await expect(dialog.locator(".MuiChip-label")).toHaveText("0");
  });

  // ── Toggle Yes → No ───────────────────────────────────────────────────────

  test("should toggle a student from present (Yes) to absent (No)", async ({
    page,
  }) => {
    const dialog = page.getByRole("dialog");
    const firstRow = dialog.getByRole("listitem").first();
    const yesBtn = firstRow.getByRole("button", { name: "Yes" });
    const noBtn = firstRow.getByRole("button", { name: "No" });

    // First: mark present
    await Promise.all([waitForAttendancePost(page), yesBtn.click()]);
    await expect(yesBtn).toHaveClass(/MuiButton-contained/);
    await expect(dialog.locator(".MuiChip-label")).toHaveText("1");

    // Then: toggle to absent
    await Promise.all([waitForAttendancePost(page), noBtn.click()]);

    // No is now active, Yes is inactive; count drops back to 0
    await expect(noBtn).toHaveClass(/MuiButton-contained/);
    await expect(yesBtn).toHaveClass(/MuiButton-outlined/);
    await expect(dialog.locator(".MuiChip-label")).toHaveText("0");
  });

  // ── Toggle No → Yes ───────────────────────────────────────────────────────

  test("should toggle a student from absent (No) to present (Yes)", async ({
    page,
  }) => {
    const dialog = page.getByRole("dialog");
    const firstRow = dialog.getByRole("listitem").first();
    const yesBtn = firstRow.getByRole("button", { name: "Yes" });
    const noBtn = firstRow.getByRole("button", { name: "No" });

    // First: mark absent
    await Promise.all([waitForAttendancePost(page), noBtn.click()]);
    await expect(noBtn).toHaveClass(/MuiButton-contained/);
    await expect(dialog.locator(".MuiChip-label")).toHaveText("0");

    // Then: toggle to present
    await Promise.all([waitForAttendancePost(page), yesBtn.click()]);

    // Yes is now active, No is inactive; count rises to 1
    await expect(yesBtn).toHaveClass(/MuiButton-contained/);
    await expect(noBtn).toHaveClass(/MuiButton-outlined/);
    await expect(dialog.locator(".MuiChip-label")).toHaveText("1");
  });

  // ── Close modal ───────────────────────────────────────────────────────────

  test("should close the modal when clicking Close", async ({ page }) => {
    const dialog = page.getByRole("dialog");

    await dialog.getByRole("button", { name: "Close" }).click();

    await dialog.waitFor({ state: "hidden" });
    await expect(dialog).not.toBeVisible();
  });
});
