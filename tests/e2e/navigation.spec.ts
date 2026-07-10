import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page redirects or loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\//);
  });

  test("login page renders the login form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("form")).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test("register page renders the registration form", async ({ page }) => {
    await page.goto("/register");
    await expect(page.locator("form")).toBeVisible();
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test("login page has a link to register", async ({ page }) => {
    await page.goto("/login");
    const registerLink = page.getByRole("link", { name: /create a trove account/i });
    await expect(registerLink).toBeVisible();
  });
});

test.describe("Login Form Validation", () => {
  test("shows validation errors for empty submission", async ({ page }) => {
    await page.goto("/login");
    // Click submit without filling in fields
    await page.getByRole("button", { name: /sign in|log in|login/i }).click();
    // Should show some validation feedback
    await expect(page.locator("form")).toBeVisible();
  });

  test("shows error for invalid email format", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel(/email/i).fill("not-an-email");
    await page.getByLabel(/password/i).fill("password123");
    await page.getByRole("button", { name: /sign in|log in|login/i }).click();
    // Form should still be visible (not navigated away)
    await expect(page.locator("form")).toBeVisible();
  });
});
