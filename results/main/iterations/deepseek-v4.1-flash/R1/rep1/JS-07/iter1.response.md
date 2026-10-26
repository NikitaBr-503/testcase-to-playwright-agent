```ts
import { test, expect } from '@playwright/test';

test('JS-07: Перегляд картки товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in (fresh, unauthenticated browser session).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByText('Banana Juice (1000ml)', { exact: true }).click();

  // Expected 1
  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();
  await expect(
    productDialog.getByRole('heading', { name: 'Banana Juice (1000ml)' })
  ).toBeVisible();

  // Expected 2
  await expect(productDialog.getByText('1.99¤')).toBeVisible();
  await expect(productDialog.getByText('Reviews', { exact: true })).toBeVisible();
});
```