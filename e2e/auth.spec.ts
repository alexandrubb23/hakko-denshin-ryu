import {
  ADMIN_CREDENTIALS,
  expect,
  logoutViaUi,
  submitLoginForm,
  test,
} from "./fixtures";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    // Wait for the session check to complete so the form is visible
    await page.getByLabel("Email").waitFor({ state: "visible" });
  });

  test("should render login form with email, password fields and submit button", async ({
    page,
  }) => {
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("should show validation error for empty email on submit", async ({ page }) => {
    await page.getByLabel("Password", { exact: true }).fill("somepassword");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();
  });

  test("should show validation error for empty password on submit", async ({ page }) => {
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("should show validation error for invalid email format", async ({ page }) => {
    await submitLoginForm(page, "notanemail", "somepassword");
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();
  });

  test("should show error alert for wrong password", async ({ page }) => {
    await submitLoginForm(page, ADMIN_CREDENTIALS.email, "definitely-wrong-password");
    await expect(page.getByRole("alert")).toContainText("Invalid email or password");
  });

  test("should show error alert for non-existent email", async ({ page }) => {
    await submitLoginForm(page, "doesnotexist@example.com", "somepassword123");
    await expect(page.getByRole("alert")).toBeVisible();
  });

  test("should redirect to /dashboard on successful login", async ({ page }) => {
    await submitLoginForm(page, ADMIN_CREDENTIALS.email, ADMIN_CREDENTIALS.password);
    await expect(page).toHaveURL("/dashboard");
  });

  test("should redirect to /dashboard when already authenticated", async ({ adminPage }) => {
    await adminPage.goto("/login");
    await expect(adminPage).toHaveURL("/dashboard");
  });
});

test.describe("Protected Routes", () => {
  test("should redirect unauthenticated user from /dashboard to /login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL("/login");
  });

  test("should redirect unauthenticated user from /students to /login", async ({ page }) => {
    await page.goto("/students");
    await expect(page).toHaveURL("/login");
  });
});

test.describe("Admin-Only Routes", () => {
  test("should allow admin to access /students", async ({ adminPage }) => {
    await adminPage.goto("/students");
    await expect(adminPage).toHaveURL("/students");
    await expect(adminPage.getByRole("heading", { name: "Students" })).toBeVisible();
  });

  test("should redirect student from /students to /dashboard", async ({ studentPage }) => {
    await studentPage.goto("/students");
    await expect(studentPage).toHaveURL("/dashboard");
  });
});

test.describe("Logout", () => {
  test("should sign out and redirect to /login", async ({ adminPage }) => {
    await logoutViaUi(adminPage);
    await expect(adminPage.getByLabel("Email")).toBeVisible();
  });

  test("should redirect to /login when visiting a protected route after logout", async ({
    adminPage,
  }) => {
    await logoutViaUi(adminPage);
    await adminPage.goto("/dashboard");
    await expect(adminPage).toHaveURL("/login");
  });

  test("should clear session so the login form is shown after logout", async ({ adminPage }) => {
    await logoutViaUi(adminPage);
    await expect(adminPage.getByRole("button", { name: "Sign In" })).toBeVisible();
  });
});

test.describe("Session Persistence", () => {
  test("should persist session across page reloads", async ({ adminPage }) => {
    await adminPage.reload();
    await expect(adminPage).toHaveURL("/dashboard");
    await expect(
      adminPage.getByText(`Welcome, ${ADMIN_CREDENTIALS.name}!`)
    ).toBeVisible();
  });
});
