```ts
import { test, expect } from '@playwright/test';

test('JS-08 Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in - no login steps are performed.

  // Step 1
  await page.goto('/');

  // Step 2
  const productName = page.getByText('Apple Pomace', { exact: true }).first();
  await expect(productName).toBeVisible();
  await productName.click();

  // The product detail window is open
  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();

  // Step 3
  await productDialog.getByRole('button', { name: 'Close' }).click();

  // Expected 1
  await expect(page.getByRole('dialog')).toBeHidden();

  // Expected 2
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
});
```