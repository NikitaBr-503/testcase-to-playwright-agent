```ts
import { test, expect } from '@playwright/test';

test('JS-07: Перегляд картки товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login is performed in this test).

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  const bananaJuiceCard = page
    .locator('article')
    .filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaJuiceCard
    .getByRole('button', { name: 'Click for more information about the product' })
    .click();

  // Expected 1
  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();
  await expect(
    productDialog.getByRole('heading', { name: 'Banana Juice (1000ml)', level: 1 })
  ).toBeVisible();

  // Expected 2
  await expect(productDialog.getByText('1.99¤', { exact: true })).toBeVisible();
  await expect(productDialog.getByRole('button', { name: /Reviews/ })).toBeVisible();
});
```