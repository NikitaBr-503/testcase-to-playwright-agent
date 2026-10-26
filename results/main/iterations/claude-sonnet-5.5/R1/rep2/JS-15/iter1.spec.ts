import { test, expect } from '../../../../../support/fixtures';
test('JS-15: Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are dismissed by the test environment.
  // User qa_user@example.com is registered and has an empty basket.
  const email = 'qa_user@example.com';
  const password = 'QaPassword123!';

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /Account|account menu/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByRole('textbox', { name: /email/i }).fill(email);

  // Step 5
  await page.getByLabel('Text field for the login password').fill(password);

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  const appleCard = page.locator('mat-card').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaCard = page.locator('mat-card').filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  const basketButton = page.getByRole('button', { name: /Your Basket|shopping cart/i });
  await expect(basketButton).toContainText('2');

  // Step 9
  await basketButton.click();

  // Expected 2
  const appleRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const bananaRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(appleRow).toBeVisible();
  await expect(bananaRow).toBeVisible();
  await expect(appleRow.locator('.mat-column-quantity')).toContainText('1');
  await expect(bananaRow.locator('.mat-column-quantity')).toContainText('1');

  // Expected 3
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();
});
