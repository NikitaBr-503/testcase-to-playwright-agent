```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // The user qa_user@example.com is registered and the basket is empty (test environment setup).
  // The welcome dialog and the cookie banner are already dismissed.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Text field for the login email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();

  // Step 7
  const productCard = page.locator('mat-card', { hasText: 'Apple Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();
  const row = page.locator('mat-row, tr.mat-row', { hasText: 'Apple Juice (1000ml)' });
  await expect(row).toBeVisible();

  // Step 9
  await row.locator('button').filter({ has: page.locator('svg[data-icon="plus-square"], .fa-plus-square') }).click();

  // Expected 1
  await expect(row.locator('.mat-cell.mat-column-quantity, td.mat-column-quantity')).toContainText('2');
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await row.locator('button').filter({ has: page.locator('svg[data-icon="minus-square"], .fa-minus-square') }).click();

  // Expected 2
  await expect(row.locator('.mat-cell.mat-column-quantity, td.mat-column-quantity')).toContainText('1');
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
```