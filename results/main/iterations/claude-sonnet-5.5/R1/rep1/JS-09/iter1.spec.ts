import { test, expect } from '../../../../../support/fixtures';
test('JS-09: Перехід на сторінку «About Us» через бічне меню', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context is used for each test.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /menu/i }).click();

  // Step 3
  await page.getByRole('link', { name: /About Us/i }).click();

  // Expected 1
  await expect(page).toHaveURL(/\/about/);
  await expect(page.getByRole('heading', { name: /About Us/i })).toBeVisible();

  // Expected 2
  await expect(page.getByText('Corporate History & Policy')).toBeVisible();
});
