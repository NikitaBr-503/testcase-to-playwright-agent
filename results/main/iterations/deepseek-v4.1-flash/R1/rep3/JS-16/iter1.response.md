```ts
import { test, expect } from '@playwright/test';

test('JS-16 Видалення товару з кошика', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const userEmail = 'qa_user@example.com';
  const userPassword = 'QaPassword123!';

  // Preconditions
  // - Welcome dialog and cookie banner are already dismissed by the test environment
  // - User qa_user@example.com is registered
  // - The user's basket is empty (prepared by the test environment / test data setup)

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: /email/i }).fill(userEmail);

  // Step 5
  await page.getByLabel(/password/i).fill(userPassword);

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  // Step 7
  const productCard = page.locator('mat-card').filter({ hasText: productName });
  await expect(productCard).toBeVisible();
  await productCard.hover();
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  const basketButton = page
    .getByRole('button', { name: /your basket/i })
    .or(page.getByRole('link', { name: /your basket/i }));
  // wait until the added product is reflected in the basket counter
  await expect(basketButton).toContainText('1');

  // Step 8
  await basketButton.click();

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toHaveCount(1);
  await basketRow.getByRole('button', { name: /delete|remove/i }).click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: productName })).toHaveCount(0);
  await expect(page.getByText(productName, { exact: true })).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toContainText('0');
});
```