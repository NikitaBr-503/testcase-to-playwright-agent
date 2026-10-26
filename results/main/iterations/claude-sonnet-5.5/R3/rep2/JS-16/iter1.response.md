```ts
import { test, expect } from '@playwright/test';

test('JS-16: Видалення товару з кошика', async ({ page }) => {
  // Preconditions
  // The user is registered and the basket is empty (new session, nothing added yet).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();

  // Step 7
  const productCard = page.locator('mat-card', { hasText: 'Apple Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(basketButton).toContainText('1');
  await basketButton.click();

  const basketRow = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  await expect(basketRow).toBeVisible();

  // Step 9
  await basketRow.getByRole('button').click();

  // Expected 1
  await expect(page.getByRole('row', { name: /Apple Juice \(1000ml\)/ })).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toContainText('0');
});
```