import { test, expect } from '../../../../../support/fixtures';
test('JS-08 Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in - no login is performed in this test.

  // Step 1
  await page.goto('/');

  // Step 2
  const applePomaceArticle = page.locator('article').filter({ hasText: 'Apple Pomace' });
  await applePomaceArticle
    .getByRole('button', { name: 'Click for more information about the product' })
    .click();

  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();
  await expect(productDialog).toContainText('Apple Pomace');

  // Step 3
  await productDialog.getByRole('button', { name: 'Close', exact: true }).click();

  // Expected 1
  await expect(productDialog).toBeHidden();

  // Expected 2
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();
  await expect(applePomaceArticle).toBeVisible();
});
