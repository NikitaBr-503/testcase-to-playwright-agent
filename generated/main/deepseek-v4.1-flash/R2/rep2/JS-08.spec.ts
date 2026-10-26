import { test, expect } from '../../../../../support/fixtures';
test('JS-08 Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login steps are performed).

  // Step 1
  await page.goto('/');

  // Step 2
  const applePomaceCard = page.locator('article').filter({ hasText: 'Apple Pomace' });
  await expect(applePomaceCard).toBeVisible();
  await applePomaceCard
    .getByRole('button', { name: 'Click for more information about the product' })
    .click();

  // Step 3
  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();
  await productDialog.getByRole('button', { name: 'Close' }).click();

  // Expected 1
  await expect(productDialog).toBeHidden();
  await expect(page.getByRole('button', { name: 'Close' })).toBeHidden();

  // Expected 2
  await expect(page.locator('main').getByText('All Products', { exact: true })).toBeVisible();
  await expect(applePomaceCard).toBeVisible();
});
