```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // - The welcome dialog and the cookie banner are already dismissed by the test environment
  // - The user qa_user@example.com is registered
  // - The user's basket is empty

  // Step 1
  await page.goto('/');
  // Preconditions: the basket of the registered user is empty
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toHaveText(/Your Basket\s*0/);

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

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();

  // Step 9
  await basketRow.getByRole('button', { name: /increase|add/i }).click();

  // Expected 1
  await expect(basketRow.getByText('2', { exact: true })).toBeVisible();
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await basketRow.getByRole('button', { name: /decrease|minus/i }).click();

  // Expected 2
  await expect(basketRow.getByText('1', { exact: true })).toBeVisible();
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
```