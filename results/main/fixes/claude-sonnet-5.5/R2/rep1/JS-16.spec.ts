import { test, expect } from '../../../../../support/fixtures';
test('JS-16: Видалення товару з кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; user is registered; basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Go to login page' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 7
  const productCard = page.locator('mat-card', { hasText: 'Apple Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(basketButton).toContainText('1');
  await basketButton.click();

  // Step 9
  const basketRow = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  await expect(basketRow).toBeVisible();
  await basketRow.getByRole('button').last().click();

  // Expected 1
  await expect(page.getByRole('row', { name: /Apple Juice \(1000ml\)/ })).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toContainText('0');
});
