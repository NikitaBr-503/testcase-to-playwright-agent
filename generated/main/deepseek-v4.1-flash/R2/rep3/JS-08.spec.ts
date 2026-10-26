import { test, expect } from '../../../../../support/fixtures';
test('JS-08 Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in (fresh browser context, no login performed).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /Apple Pomace/ }).click();

  // Step 3
  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();
  await productDialog.getByRole('button', { name: 'Close' }).click();

  // Expected 1
  await expect(page.getByRole('dialog')).toBeHidden();

  // Expected 2
  await expect(page.getByRole('main').getByText('All Products', { exact: true })).toBeVisible();
});
