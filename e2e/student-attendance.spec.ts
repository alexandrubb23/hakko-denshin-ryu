import { type Page } from "./fixtures";
import {
  createStudentViaUI,
  expect,
  navigateToStudentDetail,
  newStudent,
  test,
} from "./fixtures";

/**
 * A known past training day (Tuesday, April 29 2025) used as a stable
 * fixed date so tests are not sensitive to "today's" date.
 */
const TEST_DATE = "2025-04-29";

/**
 * Navigates to a specific attendance view for the current student page.
 * Assumes the page URL is already on /students/:id (with or without params).
 */
async function navigateToAttendanceView(
  page: Page,
  view: "day" | "week" | "month" | "year",
  date = TEST_DATE
): Promise<void> {
  const basePath = page.url().split("?")[0];
  await page.goto(`${basePath}?tab=attendance&view=${view}&date=${date}`);
}

/**
 * Waits for a POST to the attendance endpoint and returns the parsed response body.
 * Must be called BEFORE triggering the action that fires the request.
 */
function waitForAttendancePost(page: Page) {
  return page.waitForResponse(
    (r) => r.url().includes("/attendance") && r.request().method() === "POST" && r.status() === 200
  );
}

test.describe("Student Attendance Management", () => {
  let student: ReturnType<typeof newStudent>;

  test.beforeEach(async ({ adminPage }) => {
    student = newStudent();
    await adminPage.goto("/students");
    await adminPage
      .getByRole("heading", { name: "Students" })
      .waitFor({ state: "visible" });
    await createStudentViaUI(adminPage, student);
    await navigateToStudentDetail(adminPage, student);
  });

  // ── Day view — CRUD ────────────────────────────────────────────────────────

  test.describe("Day view — marking attendance", () => {
    test.beforeEach(async ({ adminPage }) => {
      await navigateToAttendanceView(adminPage, "day");
      await adminPage.getByRole("button", { name: /^yes$/i }).waitFor({ state: "visible" });
    });

    test("should mark attendance as present (Yes) for the first time", async ({ adminPage }) => {
      await expect(adminPage.getByText(/mark attendance for this session:/i)).toBeVisible();

      const [response] = await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^yes$/i }).click(),
      ]);

      const data = await response.json();
      expect(data.record.attended).toBe(true);
      await expect(adminPage.getByText(/attendance marked:/i)).toBeVisible();
    });

    test("should mark attendance as absent (No) for the first time", async ({ adminPage }) => {
      await expect(adminPage.getByText(/mark attendance for this session:/i)).toBeVisible();

      const [response] = await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^no$/i }).click(),
      ]);

      const data = await response.json();
      expect(data.record.attended).toBe(false);
      await expect(adminPage.getByText(/attendance marked:/i)).toBeVisible();
    });

    test("should update attendance from present to absent", async ({ adminPage }) => {
      // Create: mark Yes
      await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^yes$/i }).click(),
      ]);
      await expect(adminPage.getByText(/attendance marked:/i)).toBeVisible();

      // Update: click No (No is still clickable — only Yes is locked)
      const [response] = await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^no$/i }).click(),
      ]);

      const data = await response.json();
      expect(data.record.attended).toBe(false);
      await expect(adminPage.getByText(/attendance marked:/i)).toBeVisible();
    });

    test("should update attendance from absent to present", async ({ adminPage }) => {
      // Create: mark No
      await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^no$/i }).click(),
      ]);
      await expect(adminPage.getByText(/attendance marked:/i)).toBeVisible();

      // Update: click Yes (Yes is still clickable — only No is locked)
      const [response] = await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^yes$/i }).click(),
      ]);

      const data = await response.json();
      expect(data.record.attended).toBe(true);
      await expect(adminPage.getByText(/attendance marked:/i)).toBeVisible();
    });

    test("should persist attendance after navigating away and back", async ({ adminPage }) => {
      await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^yes$/i }).click(),
      ]);

      // Navigate away to ranks tab, then back to the same attendance date
      await adminPage.getByRole("tab", { name: /ranks/i }).click();
      await navigateToAttendanceView(adminPage, "day");
      await adminPage.getByRole("button", { name: /^yes$/i }).waitFor({ state: "visible" });

      // The label should show "Attendance marked:" — not the initial prompt
      await expect(adminPage.getByText(/attendance marked:/i)).toBeVisible();
    });
  });

  // ── Week view — marking attendance ─────────────────────────────────────────

  test.describe("Week view — marking attendance", () => {
    test.beforeEach(async ({ adminPage }) => {
      await navigateToAttendanceView(adminPage, "week");
      await adminPage.getByRole("button", { name: /^yes$/i }).first().waitFor({ state: "visible" });
    });

    test("should mark attendance as present on a training day", async ({ adminPage }) => {
      const [response] = await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^yes$/i }).first().click(),
      ]);

      const data = await response.json();
      expect(data.record.attended).toBe(true);
    });

    test("should mark attendance as absent on a training day", async ({ adminPage }) => {
      const [response] = await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^no$/i }).first().click(),
      ]);

      const data = await response.json();
      expect(data.record.attended).toBe(false);
    });
  });

  // ── Month view — marking attendance ────────────────────────────────────────

  test.describe("Month view — marking attendance", () => {
    test.beforeEach(async ({ adminPage }) => {
      await navigateToAttendanceView(adminPage, "month");
      await adminPage.getByRole("button", { name: /^yes$/i }).first().waitFor({ state: "visible" });
    });

    test("should mark attendance as present on a training day", async ({ adminPage }) => {
      const [response] = await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^yes$/i }).first().click(),
      ]);

      const data = await response.json();
      expect(data.record.attended).toBe(true);
    });

    test("should mark attendance as absent on a training day", async ({ adminPage }) => {
      const [response] = await Promise.all([
        waitForAttendancePost(adminPage),
        adminPage.getByRole("button", { name: /^no$/i }).first().click(),
      ]);

      const data = await response.json();
      expect(data.record.attended).toBe(false);
    });
  });
});
