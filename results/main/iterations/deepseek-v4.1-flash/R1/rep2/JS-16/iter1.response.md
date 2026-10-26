```ts
import { test, expect } from '@playwright/test';

test('JS-16 Видалення товару з кошика', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const userEmail = 'qa_user@example.com';
  const userPassword = 'QaPassword123!';

  // Preconditions
  // Вітальне вікно та банер про cookies вже закриті налаштуваннями тестового середовища.
  // Користувач qa_user@example.com зареєстрований, кошик користувача порожній.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login', exact: true }).click();

  // Step 4
  await page.getByLabel('Email').fill(userEmail);

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill(userPassword);

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  // Step 7
  const productCard = page.locator('mat-card').filter({ hasText: productName });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(basketButton).toContainText('1');

  // Step 8
  await basketButton.click();
  await expect(page).toHaveURL(/basket/);

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  await basketRow
    .getByRole('button')
    .filter({ has: page.locator('mat-icon', { hasText: 'delete' }) })
    .click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: productName })).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toContainText('0');
});
```