```ts
import { test, expect } from '@playwright/test';

test('JS-08 Закриття вікна з описом товару', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the environment; the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByText('Apple Pomace', { exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Step 3
  await dialog.getByRole('button', { name: 'Close' }).click();

  // Expected 1
  await expect(dialog).toBeHidden();

  // Expected 2
  await expect(page.getByText('All Products')).toBeVisible();
});
```