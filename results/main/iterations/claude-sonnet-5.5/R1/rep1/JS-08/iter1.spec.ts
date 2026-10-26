import { test, expect } from '../../../../../support/fixtures';
test('JS-08: Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  await page.getByText('Apple Pomace', { exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('Apple Pomace').first()).toBeVisible();

  // Step 3
  await dialog.getByRole('button', { name: 'Close' }).click();

  // Expected 1
  await expect(dialog).toBeHidden();

  // Expected 2
  await expect(page.getByText('All Products')).toBeVisible();
});
