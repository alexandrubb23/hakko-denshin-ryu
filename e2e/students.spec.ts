import { expect, test, newStudent, createStudentViaUI } from "./fixtures";

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
    // Verify the category chip is rendered in the table row
    const row = adminPage.getByRole("row").filter({ hasText: student.email });
    await expect(row.getByText("Kid")).toBeVisible();
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

  test("should edit a student's category and reflect the change in the table", async ({
    adminPage,
  }) => {
    const student = newStudent(); // default category: "kid"
    await createStudentViaUI(adminPage, student);

    const row = adminPage.getByRole("row").filter({ hasText: student.email });
    await row.getByRole("button", { name: "Edit student" }).click();

    const dialog = adminPage.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });

    // MUI Select renders a <div role="combobox"> — getByLabel doesn't work for it.
    const categorySelect = dialog.getByRole("combobox");
    await categorySelect.waitFor({ state: "visible" });
    await categorySelect.click();
    // Options render in a portal outside the dialog
    await adminPage.getByRole("listbox").waitFor({ state: "visible" });
    await adminPage.getByRole("option", { name: /^senior$/i }).click();

    await dialog.getByRole("button", { name: "Save Changes" }).click();
    await dialog.waitFor({ state: "hidden" });

    // The updated row should now show the "Senior" chip
    const updatedRow = adminPage.getByRole("row").filter({ hasText: student.email });
    await expect(updatedRow.getByText("Senior")).toBeVisible();
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
