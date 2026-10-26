```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the environment; user is registered, basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /Account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/i }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^Log ?in$/i }).click();

  // Step 7
  const productCard = page.locator('mat-card').filter({ hasText: 'Apple Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: /Your Basket/i }).click();
  const row = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(row).toBeVisible();
  const plusButton = row.locator('button').filter({ has: page.locator('svg[data-icon="plus-square"]') });
  const minusButton = row.locator('button').filter({ has: page.locator('svg[data-icon="minus-square"]') });
  const quantityCell = row.getByRole('cell').filter({ has: plusButton });

  // Step 9
  await plusButton.click();

  // Expected 1
  await expect(quantityCell).toHaveText('2');
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await minusButton.click();

  // Expected 2
  await expect(quantityCell).toHaveText('1');
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
```