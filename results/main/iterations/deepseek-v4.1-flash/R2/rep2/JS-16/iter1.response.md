```ts
import { test, expect } from '@playwright/test';

test('JS-16 Видалення товару з кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the test environment; qa_user is registered.
  await page.goto('/');
  const shoppingCartButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(shoppingCartButton).toHaveText(/Your Basket\s*0/);

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();

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
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();
  await expect(shoppingCartButton).toHaveText(/Your Basket\s*0/);

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(shoppingCartButton).toHaveText(/Your Basket\s*1/);

  // Step 8
  await shoppingCartButton.click();
  const appleJuiceRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceRow).toBeVisible();

  // Step 9
  await appleJuiceRow.getByRole('button').filter({ hasText: 'delete' }).click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' })).toHaveCount(0);

  // Expected 2
  await expect(shoppingCartButton).toHaveText(/Your Basket\s*0/);
});
```