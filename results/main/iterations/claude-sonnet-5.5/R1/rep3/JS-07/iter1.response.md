```ts
import { test, expect } from '@playwright/test';

test('JS-07: Перегляд картки товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed; the user is not logged in (fresh browser context).

  // Step 1
  await page.goto('/');

  // Step 2
  const productName = 'Banana Juice (1000ml)';
  await page.getByText(productName, { exact: true }).click();

  // Expected 1
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: productName })).toBeVisible();

  // Expected 2
  await expect(dialog.getByText('1.99¤')).toBeVisible();
  await expect(dialog.getByText('Reviews').first()).toBeVisible();
});
```