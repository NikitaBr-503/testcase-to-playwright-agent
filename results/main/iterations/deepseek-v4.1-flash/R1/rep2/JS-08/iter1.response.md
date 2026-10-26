```ts
import { test, expect } from '@playwright/test';

test('JS-08 Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: no authentication is performed in this test.

  // Step 1
  await page.goto('/');

  // Step 2
  const productName = page.getByText('Apple Pomace', { exact: true });
  await expect(productName).toBeVisible();
  await productName.click();

  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();

  // Step 3
  await productDialog.getByRole('button', { name: /close/i }).click();

  // Expected 1
  await expect(productDialog).toBeHidden();

  // Expected 2
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
});
```