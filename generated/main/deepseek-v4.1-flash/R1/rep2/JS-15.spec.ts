import { test, expect } from '../../../../../support/fixtures';
test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /Account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByLabel('Email')).toBeHidden();

  // Step 7
  const appleCard = page.locator('mat-card').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaCard = page.locator('mat-card').filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 9
  const basketButton = page.getByRole('button', { name: /Your Basket|shopping cart/i });
  await basketButton.click();

  // Expected 1
  await expect(basketButton).toContainText('2');

  // Expected 2
  const appleRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const bananaRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(appleRow).toBeVisible();
  await expect(bananaRow).toBeVisible();
  await expect(appleRow.locator('.mat-column-quantity')).toContainText('1');
  await expect(bananaRow.locator('.mat-column-quantity')).toContainText('1');
  await expect(appleRow.locator('.mat-column-price')).toContainText('1.99¤');
  await expect(bananaRow.locator('.mat-column-price')).toContainText('1.99¤');

  // Expected 3
  await expect(page.getByText(/Total Price:\s*3\.98¤/)).toBeVisible();
});
