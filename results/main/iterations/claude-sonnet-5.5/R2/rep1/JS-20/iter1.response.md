```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // The user qa_user@example.com is registered and the basket is empty (environment setup).
  // The welcome dialog and cookie banner are already dismissed.

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

  // Step 7
  const appleJuiceCard = page.locator('mat-card', {
    has: page.getByRole('img', { name: 'Apple Juice (1000ml)' }),
  });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  const row = page.locator('mat-row, tr.mat-row', { hasText: 'Apple Juice (1000ml)' });
  await expect(row).toBeVisible();
  await row.locator('button').nth(1).click();

  // Expected 1
  await expect(row.locator('.mat-column-quantity')).toContainText('2');
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await row.locator('button').nth(0).click();

  // Expected 2
  await expect(row.locator('.mat-column-quantity')).toContainText('1');
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
```