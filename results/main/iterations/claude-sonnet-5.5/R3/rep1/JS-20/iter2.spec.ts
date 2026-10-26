import { test, expect } from '../../../../../support/fixtures';
test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // The user qa_user@example.com is registered and the basket is empty (test environment setup).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Add to Basket' }).first()).toBeVisible();

  // Step 7
  const productCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  const row = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  await expect(row).toBeVisible();
  const quantityCell = row.locator('.mat-column-quantity');
  await expect(quantityCell).toContainText(/\b1\b/);
  await row.getByRole('button').nth(1).click();

  // Expected 1
  await expect(quantityCell).toContainText(/\b2\b/);
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await row.getByRole('button').first().click();

  // Expected 2
  await expect(quantityCell).toContainText(/\b1\b/);
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
