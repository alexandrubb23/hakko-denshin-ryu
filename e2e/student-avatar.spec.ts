import {
  createStudentViaUI,
  expect,
  navigateToStudentDetail,
  newStudent,
  test,
  type Page,
} from "./fixtures";

// ─── Test image ───────────────────────────────────────────────────────────────

/**
 * Minimal 1×1 transparent PNG supplied as a Playwright virtual file.
 * No fixture file needed on disk — avoids committing binaries.
 */
const TEST_IMAGE = {
  name: "test-avatar.png",
  mimeType: "image/png" as const,
  buffer: Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "base64"
  ),
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns a promise that resolves when the avatar POST to /image completes
 * successfully. Must be set up BEFORE the action that triggers the request.
 */
function waitForAvatarUpload(page: Page) {
  return page.waitForResponse(
    (r) =>
      r.url().includes("/image") &&
      r.request().method() === "POST" &&
      r.status() === 200
  );
}

/** Navigates to the students list and waits for the page heading. */
async function gotoStudentsList(page: Page): Promise<void> {
  await page.goto("/students");
  await page
    .getByRole("heading", { name: "Students" })
    .waitFor({ state: "visible" });
}

/**
 * Clicks the student avatar, stages a test image in the upload dialog,
 * and submits. Waits for the server response and the dialog to close.
 */
async function uploadAvatarViaUI(page: Page): Promise<void> {
  await page.getByTestId("student-avatar").click();

  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  await expect(dialog).toContainText("Update Profile Photo");

  // Set file on the hidden <input type="file"> inside the drop zone
  await page.locator('input[type="file"]').setInputFiles(TEST_IMAGE);

  // Wait for the Upload button to become enabled (file staged successfully)
  const uploadBtn = dialog.getByRole("button", { name: "Upload" });
  await expect(uploadBtn).toBeEnabled();

  const uploadDone = waitForAvatarUpload(page);
  await uploadBtn.click();
  await uploadDone;

  await dialog.waitFor({ state: "hidden" });
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe("Student Avatar Management", () => {
  let student: ReturnType<typeof newStudent>;

  test.beforeEach(async ({ adminPage }) => {
    // MUI Avatar v7 removes the <img> from the DOM when the image fails to
    // load (no src error state). Intercept fake Cloudinary URLs and serve the
    // same 1×1 PNG so the <img> element stays in the DOM for assertions.
    await adminPage.route("**/res.cloudinary.com/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: TEST_IMAGE.mimeType,
        body: TEST_IMAGE.buffer,
      })
    );

    student = newStudent();

    await gotoStudentsList(adminPage);
    await createStudentViaUI(adminPage, student);
    await navigateToStudentDetail(adminPage, student);

    await adminPage.getByTestId("student-avatar").waitFor({ state: "visible" });
  });

  // ── Create ───────────────────────────────────────────────────────────────

  test("should upload an avatar and show it on the profile (Create)", async ({
    adminPage,
  }) => {
    await uploadAvatarViaUI(adminPage);

    // After upload, the student query is invalidated and refetches. Once the
    // new imageUrl is set, MUI Avatar renders an <img> with a Cloudinary src.
    // Cloudinary requests are intercepted in beforeEach to return a real image
    // so MUI Avatar keeps the <img> in the DOM rather than falling back to
    // initials on load error.
    await expect(
      adminPage.getByTestId("student-avatar").locator("img")
    ).toHaveAttribute("src", /cloudinary/);
  });

  // ── Read ────────────────────────────────────────────────────────────────

  test("should persist the uploaded avatar after navigating away and back (Read)", async ({
    adminPage,
  }) => {
    await uploadAvatarViaUI(adminPage);

    // Navigate away to the students list
    await gotoStudentsList(adminPage);

    // Navigate back to the student detail
    await navigateToStudentDetail(adminPage, student);
    await adminPage.getByTestId("student-avatar").waitFor({ state: "visible" });

    // Avatar must still have a Cloudinary src — not initials
    await expect(
      adminPage.getByTestId("student-avatar").locator("img")
    ).toHaveAttribute("src", /cloudinary/);
  });

  // ── Update ───────────────────────────────────────────────────────────────

  test("should replace an existing avatar with a new image (Update)", async ({
    adminPage,
  }) => {
    // Upload initial avatar
    await uploadAvatarViaUI(adminPage);

    // Wait for avatar to reflect the upload, then capture the src
    await expect(
      adminPage.getByTestId("student-avatar").locator("img")
    ).toHaveAttribute("src", /cloudinary/);

    const firstSrc = await adminPage
      .getByTestId("student-avatar")
      .locator("img")
      .getAttribute("src");

    // Open dialog again — should show the current image as preview
    await adminPage.getByTestId("student-avatar").click();
    const dialog = adminPage.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });

    // The preview avatar inside the dialog shows the existing image URL
    await expect(dialog.locator("img.MuiAvatar-img").first()).toHaveAttribute(
      "src",
      /cloudinary/
    );

    // Upload a replacement
    await adminPage.locator('input[type="file"]').setInputFiles(TEST_IMAGE);
    const uploadBtn = dialog.getByRole("button", { name: "Upload" });
    await expect(uploadBtn).toBeEnabled();

    const uploadDone = waitForAvatarUpload(adminPage);
    await uploadBtn.click();
    await uploadDone;
    await dialog.waitFor({ state: "hidden" });

    // Avatar image must still have a Cloudinary src after replacement
    await expect(
      adminPage.getByTestId("student-avatar").locator("img")
    ).toHaveAttribute("src", /cloudinary/);

    // The Cloudinary URL should be updated (new version timestamp)
    const secondSrc = await adminPage
      .getByTestId("student-avatar")
      .locator("img")
      .getAttribute("src");

    expect(secondSrc).toBeTruthy();
    expect(secondSrc).not.toBe(firstSrc);
  });
});
