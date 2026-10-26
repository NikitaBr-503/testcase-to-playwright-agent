import { test, expect } from '../../../../../support/fixtures';
test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions: welcome dialog and cookie banner are dismissed by the test environment.
  // Preconditions: user qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /Account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/i }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: /Account/i })).toBeVisible();

  // Step 7
  const appleJuiceCard = page
    .locator('mat-card')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(
    page.getByText('Placed Apple Juice (1000ml) into basket.')
  ).toBeVisible();
  const basketButton = page.getByRole('button', {
    name: /Your Basket|shopping cart/i,
  });
  await expect(basketButton.locator('.mat-badge-content')).toHaveText('1');

  // Step 8
  await basketButton.click();

  // Expected 2
  const basketRow = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  await expect(basketRow).toBeVisible();
  await expect(basketRow.getByText('Apple Juice (1000ml)')).toBeVisible();
  await expect(basketRow.getByRole('spinbutton')).toHaveValue('1');

  // Expected 3
  await expect(page.getByText(/Total Price/)).toContainText('1.99¤');
});
