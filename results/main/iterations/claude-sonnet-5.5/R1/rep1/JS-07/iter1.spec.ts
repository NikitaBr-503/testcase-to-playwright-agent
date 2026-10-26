import { test, expect } from '../../../../../support/fixtures';
test('JS-07: Перегляд картки товару', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context has no session.

  // Step 1
  await page.goto('/');
  const productName = page.getByText('Banana Juice (1000ml)', { exact: true });
  await expect(productName).toBeVisible();

  // Step 2
  await productName.click();

  // Expected 1
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Banana Juice (1000ml)' })).toBeVisible();

  // Expected 2
  await expect(dialog.getByText('1.99¤')).toBeVisible();
  await expect(dialog.getByRole('button', { name: /Reviews/ })).toBeVisible();
});
