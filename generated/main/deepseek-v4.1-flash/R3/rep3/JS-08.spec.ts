import { test, expect } from '../../../../../support/fixtures';
test('JS-08 Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login steps are performed).

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();

  // Step 2
  const applePomaceProduct = page
    .getByRole('button', { name: 'Click for more information about the product' })
    .filter({ hasText: 'Apple Pomace' });
  await applePomaceProduct.click();

  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();
  await expect(productDialog).toContainText('Apple Pomace');

  // Step 3
  await productDialog.getByRole('button', { name: 'Close' }).click();

  // Expected 1
  await expect(productDialog).toBeHidden();

  // Expected 2
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Click for more information about the product' }).first()
  ).toBeVisible();
});
