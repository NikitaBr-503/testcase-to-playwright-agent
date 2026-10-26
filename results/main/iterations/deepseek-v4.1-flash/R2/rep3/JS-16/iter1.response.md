```ts
import { test, expect } from '@playwright/test';

test('JS-16 Removing a product from the basket', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(basketButton).toHaveText(/Your Basket\s*0/);

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Log in' })).toBeHidden();

  // Step 7
  const productCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(productCard).toBeVisible();
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toHaveText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();

  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();

  // Step 9
  await basketRow.getByRole('button', { name: /delete|remove from basket/i }).click();

  // Expected 1
  await expect(basketRow).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toHaveText(/Your Basket\s*0/);
});
```