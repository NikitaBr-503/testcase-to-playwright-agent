import { test, expect } from '../../../../../support/fixtures';
test('JS-09: Перехід на сторінку «About Us» через бічне меню', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in (fresh browser context per test).

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Open Sidenav' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Open Sidenav' }).click();

  // Step 3
  await page.getByRole('link', { name: 'About Us' }).click();

  // Expected 1
  await expect(page).toHaveURL(/\/about/);
  await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('Corporate History & Policy')).toBeVisible();
});
