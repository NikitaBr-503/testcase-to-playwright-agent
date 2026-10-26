import { test, expect } from '../../../../../support/fixtures';
test('JS-16 Видалення товару з кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and the basket of this user is empty.
  const productName = 'Apple Juice (1000ml)';

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByLabel(/email/i).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 7
  const productCard = page.getByRole('article').filter({ hasText: productName });
  await expect(productCard).toBeVisible();
  await productCard.hover();
  await productCard.getByRole('button', { name: /add to basket/i }).click();

  // Step 8
  const basketButton = page.getByRole('button', { name: /your basket|shopping cart/i });
  await basketButton.click();

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  await basketRow.getByRole('button').last().click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: productName })).toHaveCount(0);
  await expect(page.locator('mat-row').getByText(productName)).toBeHidden();

  // Expected 2
  await expect(basketButton).toContainText('0');
});
