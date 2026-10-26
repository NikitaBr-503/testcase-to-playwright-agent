import { test, expect } from '../../../../../support/fixtures';
test('JS-08 Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are dismissed by the test environment.
  // A fresh browser context is used, so the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  await page.getByText('Apple Pomace', { exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('Apple Pomace')).toBeVisible();

  // Step 3
  await dialog.getByRole('button', { name: /close/i }).click();

  // Expected 1
  await expect(dialog).toBeHidden();

  // Expected 2
  await expect(page.getByText('All Products')).toBeVisible();
});
