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
    date: "2099-06-15",
    startTime: "10:00",
    endTime: "18:00",
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
  const session = dialog.getByTestId("event-session").first();
  await session.getByLabel("Date", { exact: true }).fill(event.date);
  await session.getByLabel("Start", { exact: true }).fill(event.startTime);
  await session.getByLabel("End (optional)").fill(event.endTime);
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

  test("should save an event spanning several days", async ({ adminPage }) => {
    const event = newEvent();
    await adminPage.getByRole("button", { name: "Add Event" }).click();
    const dialog = adminPage.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });

    await dialog.getByLabel("Event Name").fill(event.name);
    const first = dialog.getByTestId("event-session").first();
    await first.getByLabel("Date", { exact: true }).fill("2099-10-23");
    await first.getByLabel("Start", { exact: true }).fill("18:30");
    await first.getByLabel("End (optional)").fill("20:30");

    // "Add date" suggests the next day with the same times
    await dialog.getByRole("button", { name: "Add date" }).click();
    const second = dialog.getByTestId("event-session").nth(1);
    await expect(second.getByLabel("Date", { exact: true })).toHaveValue(
      "2099-10-24"
    );
    await second.getByLabel("Start", { exact: true }).fill("10:00");
    await second.getByLabel("End (optional)").fill("13:00");

    await dialog.getByLabel("Location").fill(event.location);
    await dialog.getByLabel("Details").fill(event.details);
    await dialog.getByRole("button", { name: "Create Event" }).click();
    await dialog.waitFor({ state: "hidden" });

    const row = adminPage.getByRole("row").filter({ hasText: event.name });
    await row.getByRole("button", { name: "Edit event" }).click();
    await dialog.waitFor({ state: "visible" });

    const sessions = dialog.getByTestId("event-session");
    await expect(sessions).toHaveCount(2);
    await expect(
      sessions.nth(1).getByLabel("Start", { exact: true })
    ).toHaveValue("10:00");
    await dialog.getByRole("button", { name: "Cancel" }).click();
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
