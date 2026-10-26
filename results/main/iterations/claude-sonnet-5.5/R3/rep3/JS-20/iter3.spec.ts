import { test, expect } from '../../../../../support/fixtures';
test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // User qa_user@example.com is registered, basket is empty (new session), dialogs are dismissed.

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
  // The accessible name of the submit button is "Login" (its visible text is "Log in")
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  const productCard = page.locator('mat-card').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(productCard.getByRole('button', { name: 'Add to Basket' })).toBeVisible();

  // Step 7
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  const row = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  await expect(row).toBeVisible();
  // Buttons in the row, in order: decrease (−), increase (+), delete
  await row.getByRole('button').nth(1).click();

  // Expected 1
  await expect(row.locator('.mat-column-quantity')).toContainText('2');
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await row.getByRole('button').nth(0).click();

  // Expected 2
  await expect(row.locator('.mat-column-quantity')).toContainText('1');
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
