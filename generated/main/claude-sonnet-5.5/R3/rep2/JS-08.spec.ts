import { test, expect } from '../../../../../support/fixtures';
test('JS-08 Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are dismissed by the environment; the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Click for more information about the product' })
    .filter({ hasText: 'Apple Pomace' })
    .click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Step 3
  await dialog.getByRole('button', { name: 'Close' }).click();

  // Expected 1
  await expect(dialog).toBeHidden();

  // Expected 2
  await expect(page.getByRole('main').getByText('All Products')).toBeVisible();
});
