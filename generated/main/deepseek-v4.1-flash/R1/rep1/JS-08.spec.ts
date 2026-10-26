import { test, expect } from '../../../../../support/fixtures';
test('JS-08 Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in, so the public catalog is available without authentication.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByText('Apple Pomace', { exact: true }).click();

  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();
  await expect(productDialog.getByText('Apple Pomace', { exact: true })).toBeVisible();

  // Step 3
  await productDialog.getByRole('button', { name: 'Close' }).click();

  // Expected 1
  await expect(productDialog).toBeHidden();

  // Expected 2
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();
});
