import { test, expect } from '../../../../../support/fixtures';
test('JS-07 Перегляд картки товару', async ({ page }) => {
  // Preconditions: welcome dialog and cookie banner are already dismissed by the test
  // environment; the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  const productCard = page.locator('article').filter({ hasText: 'Banana Juice (1000ml)' });
  await productCard
    .getByRole('button', { name: 'Click for more information about the product' })
    .click();

  // Expected 1
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Banana Juice (1000ml)' })).toBeVisible();

  // Expected 2
  await expect(dialog.getByText('1.99¤', { exact: true })).toBeVisible();
  await expect(dialog.getByText('Reviews', { exact: true })).toBeVisible();
});
