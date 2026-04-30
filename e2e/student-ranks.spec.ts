import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

/**
 * Returns unique student data on each call to avoid DB conflicts across runs.
 */
function newStudent() {
  const ts = Date.now();
  return {
    name: `E2E Rank Student ${ts}`,
    email: `e2e.rank.${ts}@example.com`,
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
  await dialog.getByLabel("Email").fill(student.email);
  await dialog.getByLabel("Password").fill(student.password);

  await dialog.getByRole("button", { name: "Create Student" }).click();
  await dialog.waitFor({ state: "hidden" });
}

/**
 * Clicks the student's row in the Students table and waits for the detail page.
 * The Ranks tab is active by default (index 0).
 */
async function navigateToStudentDetail(
  page: Page,
  student: ReturnType<typeof newStudent>
) {
  const row = page.getByRole("row").filter({ hasText: student.email });
  await row.click();
  await page.waitForURL(/\/students\/.+/);
  await page.getByRole("tab", { name: /ranks/i }).waitFor({ state: "visible" });
}

interface AssignRankOptions {
  rankName: string;
  awardedAt: string;
  notes?: string;
}

/**
 * Opens the "Assign Rank" dialog, fills the form, and submits.
 * Waits for the dialog to close before returning.
 */
async function assignRankViaUI(page: Page, options: AssignRankOptions) {
  const { rankName, awardedAt, notes } = options;

  await page.getByRole("button", { name: "Assign Rank" }).click();

  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });

  // MUI Select renders a <div role="combobox"> — getByLabel doesn't work for it.
  // Wait for the combobox to be visible (ranks may still be fetching), then open it.
  const rankSelect = dialog.getByRole("combobox");
  await rankSelect.waitFor({ state: "visible" });
  await rankSelect.click();

  // Options render in a portal outside the dialog
  await page.getByRole("listbox").waitFor({ state: "visible" });
  await page.getByRole("option", { name: rankName }).click();

  await dialog.getByLabel("Awarded on").fill(awardedAt);

  if (notes) {
    await dialog.getByLabel("Notes").fill(notes);
  }

  await dialog.getByRole("button", { name: "Assign Rank" }).click();
  await dialog.waitFor({ state: "hidden" });
}

test.describe("Student Rank Management", () => {
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

  test("should show the Ranks tab active with Assign Rank button and empty state", async ({
    adminPage,
  }) => {
    await expect(
      adminPage.getByRole("button", { name: /assign rank/i })
    ).toBeVisible();
    await expect(
      adminPage.getByText(/no ranks assigned yet/i)
    ).toBeVisible();
  });

  test("should assign a rank and show it in the table", async ({
    adminPage,
  }) => {
    await assignRankViaUI(adminPage, {
      rankName: "6 Kyu",
      awardedAt: "2024-03-01",
      notes: "Good progress",
    });

    await expect(
      adminPage.getByRole("cell", { name: "6 Kyu" })
    ).toBeVisible();
    await expect(
      adminPage.getByRole("cell", { name: "Good progress" })
    ).toBeVisible();
    await expect(
      adminPage.getByText(/no ranks assigned yet/i)
    ).not.toBeVisible();
  });

  test("should show a dash for notes when none are provided", async ({
    adminPage,
  }) => {
    await assignRankViaUI(adminPage, {
      rankName: "6 Kyu",
      awardedAt: "2024-03-01",
    });

    await expect(adminPage.getByRole("cell", { name: "6 Kyu" })).toBeVisible();
    await expect(adminPage.getByRole("cell", { name: "—" })).toBeVisible();
  });

  test("should edit a rank entry's notes and reflect the change in the table", async ({
    adminPage,
  }) => {
    await assignRankViaUI(adminPage, {
      rankName: "6 Kyu",
      awardedAt: "2024-03-01",
      notes: "Initial notes",
    });

    await expect(
      adminPage.getByRole("cell", { name: "6 Kyu" })
    ).toBeVisible();

    const row = adminPage.getByRole("row").filter({ hasText: "6 Kyu" });
    await row.getByRole("button", { name: "edit rank" }).click();

    const dialog = adminPage.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });

    await dialog.getByLabel("Notes").clear();
    await dialog.getByLabel("Notes").fill("Updated notes");

    await dialog.getByRole("button", { name: "Save Changes" }).click();
    await dialog.waitFor({ state: "hidden" });

    await expect(
      adminPage.getByRole("cell", { name: "Updated notes" })
    ).toBeVisible();
    await expect(
      adminPage.getByRole("cell", { name: "Initial notes" })
    ).not.toBeVisible();
  });

  test("should not submit the edit form when no changes are made", async ({
    adminPage,
  }) => {
    await assignRankViaUI(adminPage, {
      rankName: "6 Kyu",
      awardedAt: "2024-03-01",
      notes: "Some notes",
    });

    const row = adminPage.getByRole("row").filter({ hasText: "6 Kyu" });
    await row.getByRole("button", { name: "edit rank" }).click();

    const dialog = adminPage.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });

    // "Save Changes" is disabled when the form is not dirty
    await expect(
      dialog.getByRole("button", { name: "Save Changes" })
    ).toBeDisabled();

    await dialog.getByRole("button", { name: "Cancel" }).click();
    await dialog.waitFor({ state: "hidden" });
  });

  test("should delete a rank entry and remove it from the table", async ({
    adminPage,
  }) => {
    await assignRankViaUI(adminPage, {
      rankName: "6 Kyu",
      awardedAt: "2024-03-01",
    });

    await expect(
      adminPage.getByRole("cell", { name: "6 Kyu" })
    ).toBeVisible();

    const row = adminPage.getByRole("row").filter({ hasText: "6 Kyu" });
    await row.getByRole("button", { name: "delete rank" }).click();

    const dialog = adminPage.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    await expect(dialog).toContainText("6 Kyu");

    await adminPage.getByRole("button", { name: "Delete" }).click();
    await dialog.waitFor({ state: "hidden" });

    await expect(
      adminPage.getByRole("cell", { name: "5 Kyu" })
    ).not.toBeVisible();
    await expect(
      adminPage.getByText(/no ranks assigned yet/i)
    ).toBeVisible();
  });

  test("should assign multiple ranks and show all of them in the table", async ({
    adminPage,
  }) => {
    await assignRankViaUI(adminPage, {
      rankName: "6 Kyu",
      awardedAt: "2024-03-01",
    });
    await assignRankViaUI(adminPage, {
      rankName: "5 Kyu",
      awardedAt: "2024-09-15",
    });

    await expect(
      adminPage.getByRole("cell", { name: "6 Kyu" })
    ).toBeVisible();
    await expect(
      adminPage.getByRole("cell", { name: "5 Kyu" })
    ).toBeVisible();
  });
});
