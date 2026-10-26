import { test, expect } from '../../../../../support/fixtures';
test('JS-16: Видалення товару з кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByLabel('Text field for the login email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 7
  const productCard = page.locator('mat-card', { hasText: 'Apple Juice (1000ml)' });
  await expect(productCard).toBeVisible();
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  const basketRow = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  await expect(basketRow).toBeVisible();
  await basketRow.getByRole('button').click();

  // Expected 1
  await expect(page.getByRole('cell', { name: 'Apple Juice (1000ml)' })).toHaveCount(0);

  // Expected 2
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('0');
});
