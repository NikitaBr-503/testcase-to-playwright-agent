import { test, expect } from '../../../../../support/fixtures';
test('JS-07 Перегляд картки товару', async ({ page }) => {
  // Preconditions: welcome dialog and cookie banner are already dismissed by the test environment;
  // user is not logged in (no login performed).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('link', { name: 'Banana Juice (1000ml)' }).click();

  const dialog = page.getByRole('dialog');

  // Expected 1
  await expect(dialog.getByRole('heading', { name: 'Banana Juice (1000ml)' })).toBeVisible();

  // Expected 2
  await expect(dialog.getByText('1.99¤')).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Reviews' })).toBeVisible();
});
