import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

/**
 * Returns unique student data on each call to avoid DB conflicts across runs.
 */
function newStudent() {
  const ts = Date.now();
  return {
    name: `E2E Student ${ts}`,
    email: `e2e.student.${ts}@example.com`,
    password: "Password123!",
  };
}

/**
 * Opens the "Add Student" dialog, fills all fields, and submits.
 * Waits for the dialog to close before returning.
 */
async function createStudentViaUI(
  page: Page,
  student: ReturnType<typeof newStudent>
) {
  await page.getByRole("button", { name: "Add Student" }).click();

  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });

  await dialog.getByLabel("Name").fill(student.name);
  await dialog.getByLabel("Email", { exact: true }).fill(student.email);
  // Uncheck "Send invitation email" to reveal the Password field
  await dialog
    .getByRole("checkbox", { name: /send invitation email/i })
    .uncheck();
  await dialog.getByLabel("Password").fill(student.password);

  await dialog.getByRole("button", { name: "Create Student" }).click();
  await dialog.waitFor({ state: "hidden" });
}

test.describe("Student Management", () => {
  test.beforeEach(async ({ adminPage }) => {
    await adminPage.goto("/students");
    await adminPage
      .getByRole("heading", { name: "Students" })
      .waitFor({ state: "visible" });
  });

  test("should navigate to student detail page when clicking a row", async ({
    adminPage,
  }) => {
    const student = newStudent();
    await createStudentViaUI(adminPage, student);

    const row = adminPage.getByRole("row").filter({ hasText: student.email });
    await row.click();

    await adminPage.waitForURL(/\/students\/.+/);
    await expect(
      adminPage.getByRole("heading", { name: student.name })
    ).toBeVisible();
  });

  test("should not navigate when clicking the edit button on a row", async ({
    adminPage,
  }) => {
    const student = newStudent();
    await createStudentViaUI(adminPage, student);

    const row = adminPage.getByRole("row").filter({ hasText: student.email });
    await row.getByRole("button", { name: "Edit student" }).click();

    await expect(adminPage).toHaveURL("/students");
    await expect(adminPage.getByRole("dialog")).toBeVisible();
    await adminPage.getByRole("button", { name: "Cancel" }).click();
  });

  test("should not navigate when clicking the delete button on a row", async ({
    adminPage,
  }) => {
    const student = newStudent();
    await createStudentViaUI(adminPage, student);

    const row = adminPage.getByRole("row").filter({ hasText: student.email });
    await row.getByRole("button", { name: "Delete student" }).click();

    await expect(adminPage).toHaveURL("/students");
    await expect(adminPage.getByRole("dialog")).toBeVisible();
    await adminPage.getByRole("button", { name: "Cancel" }).click();
  });

  test("should create a new student and show them in the table", async ({
    adminPage,
  }) => {
    const student = newStudent();

    await createStudentViaUI(adminPage, student);

    await expect(
      adminPage.getByRole("cell", { name: student.name })
    ).toBeVisible();
    await expect(
      adminPage.getByRole("cell", { name: student.email })
    ).toBeVisible();
  });

  test("should edit a student's name and reflect the change in the table", async ({
    adminPage,
  }) => {
    const student = newStudent();
    await createStudentViaUI(adminPage, student);

    const row = adminPage.getByRole("row").filter({ hasText: student.email });
    await row.getByRole("button", { name: "Edit student" }).click();

    const dialog = adminPage.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });

    const updatedName = `${student.name} (edited)`;
    await dialog.getByLabel("Name").clear();
    await dialog.getByLabel("Name").fill(updatedName);

    await dialog.getByRole("button", { name: "Save Changes" }).click();
    await dialog.waitFor({ state: "hidden" });

    await expect(
      adminPage.getByRole("cell", { name: updatedName })
    ).toBeVisible();
  });

  test("should delete a student and remove them from the table", async ({
    adminPage,
  }) => {
    const student = newStudent();
    await createStudentViaUI(adminPage, student);

    await expect(
      adminPage.getByRole("cell", { name: student.email })
    ).toBeVisible();

    const row = adminPage.getByRole("row").filter({ hasText: student.email });
    await row.getByRole("button", { name: "Delete student" }).click();

    const dialog = adminPage.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    await expect(dialog).toContainText(student.name);

    await adminPage.getByRole("button", { name: "Delete" }).click();
    await dialog.waitFor({ state: "hidden" });

    await expect(
      adminPage.getByRole("cell", { name: student.email })
    ).not.toBeVisible();
  });
});
