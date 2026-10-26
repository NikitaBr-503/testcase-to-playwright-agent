```ts
import { test, expect } from '@playwright/test';

test('JS-07 Перегляд картки товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login steps are performed).

  // Step 1
  await page.goto('/');

  const productCard = page
    .locator('article')
    .filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(productCard).toBeVisible();

  // Step 2
  await productCard
    .getByRole('button', { name: 'Click for more information about the product' })
    .click();

  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();

  // Expected 1
  await expect(
    productDialog.getByRole('heading', { name: 'Banana Juice (1000ml)' })
  ).toBeVisible();

  // Expected 2
  await expect(productDialog.getByText('1.99¤')).toBeVisible();
  await expect(productDialog.getByText('Reviews', { exact: true }).first()).toBeVisible();
});
```