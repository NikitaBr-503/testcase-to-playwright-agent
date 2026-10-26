```ts
import { test, expect } from '@playwright/test';

test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and the basket is empty.
  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  const cartButton = page.getByRole('button', { name: 'Show the shopping cart' });

  // Expected 1
  await expect(page.getByText('Placed Apple Juice (1000ml) into basket.')).toBeVisible();
  await expect(cartButton).toContainText('1');

  // Step 8
  await cartButton.click();

  // Expected 2
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toHaveCount(1);
  await expect(basketRow.getByText('Apple Juice (1000ml)')).toBeVisible();
  await expect(basketRow.getByText('1', { exact: true })).toBeVisible();

  // Expected 3
  await expect(page.getByText('Total Price')).toBeVisible();
  await expect(page.getByText('1.99¤', { exact: true })).toBeVisible();
});
```