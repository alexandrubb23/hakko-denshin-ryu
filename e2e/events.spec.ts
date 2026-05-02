import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

/**
 * Returns unique event data on each call to avoid DB conflicts across runs.
 * Uses a future date so "end after start" validation always passes.
 */
function newEvent() {
  const ts = Date.now();
  return {
    name: `E2E Event ${ts}`,
    startDate: "2099-06-15T10:00",
    endDate: "2099-06-16T18:00",
    location: `Dojo ${ts}`,
    details: `E2E test event details for ${ts}`,
  };
}

/**
 * Opens the "Add Event" dialog, fills the required fields, and submits.
 * Waits for the dialog to close before returning.
 */
async function createEventViaUI(
  page: Page,
  event: ReturnType<typeof newEvent>
) {
  await page.getByRole("button", { name: "Add Event" }).click();

  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });

  await dialog.getByLabel("Event Name").fill(event.name);
  await dialog.getByLabel("Start Date & Time").fill(event.startDate);
  await dialog.getByLabel("End Date & Time (optional)").fill(event.endDate);
  await dialog.getByLabel("Location").fill(event.location);
  await dialog.getByLabel("Details").fill(event.details);

  await dialog.getByRole("button", { name: "Create Event" }).click();
  await dialog.waitFor({ state: "hidden" });
}

test.describe("Events Management", () => {
  test.beforeEach(async ({ adminPage }) => {
    await adminPage.goto("/admin/events");
    await adminPage
      .getByRole("heading", { name: "Events" })
      .waitFor({ state: "visible" });
  });

  test("should create a new event and show it in the table", async ({
    adminPage,
  }) => {
    const event = newEvent();
    await createEventViaUI(adminPage, event);

    await expect(
      adminPage.getByRole("cell", { name: event.name })
    ).toBeVisible();
    await expect(
      adminPage.getByRole("cell", { name: event.location })
    ).toBeVisible();
  });

  test("should edit an event's name and reflect the change in the table", async ({
    adminPage,
  }) => {
    const event = newEvent();
    await createEventViaUI(adminPage, event);

    const row = adminPage.getByRole("row").filter({ hasText: event.name });
    await row.getByRole("button", { name: "Edit event" }).click();

    const dialog = adminPage.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });

    const updatedName = `${event.name} (edited)`;
    await dialog.getByLabel("Event Name").clear();
    await dialog.getByLabel("Event Name").fill(updatedName);

    await dialog.getByRole("button", { name: "Save Changes" }).click();
    await dialog.waitFor({ state: "hidden" });

    await expect(
      adminPage.getByRole("cell", { name: updatedName })
    ).toBeVisible();
  });

  test("should delete an event and remove it from the table", async ({
    adminPage,
  }) => {
    const event = newEvent();
    await createEventViaUI(adminPage, event);

    await expect(
      adminPage.getByRole("cell", { name: event.name })
    ).toBeVisible();

    const row = adminPage.getByRole("row").filter({ hasText: event.name });
    await row.getByRole("button", { name: "Delete event" }).click();

    const dialog = adminPage.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    await expect(dialog).toContainText(event.name);

    await adminPage.getByRole("button", { name: "Delete" }).click();
    await dialog.waitFor({ state: "hidden" });

    await expect(
      adminPage.getByRole("cell", { name: event.name })
    ).not.toBeVisible();
  });

  test("should not navigate when clicking the edit button on a row", async ({
    adminPage,
  }) => {
    const event = newEvent();
    await createEventViaUI(adminPage, event);

    const row = adminPage.getByRole("row").filter({ hasText: event.name });
    await row.getByRole("button", { name: "Edit event" }).click();

    await expect(adminPage).toHaveURL("/admin/events");
    await expect(adminPage.getByRole("dialog")).toBeVisible();
    await adminPage.getByRole("button", { name: "Cancel" }).click();
  });

  test("should not navigate when clicking the delete button on a row", async ({
    adminPage,
  }) => {
    const event = newEvent();
    await createEventViaUI(adminPage, event);

    const row = adminPage.getByRole("row").filter({ hasText: event.name });
    await row.getByRole("button", { name: "Delete event" }).click();

    await expect(adminPage).toHaveURL("/admin/events");
    await expect(adminPage.getByRole("dialog")).toBeVisible();
    await adminPage.getByRole("button", { name: "Cancel" }).click();
  });
});
