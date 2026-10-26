```ts
import { test, expect } from '@playwright/test';

test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  await page.getByRole('combobox', { name: 'Items per page:' }).click();
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.locator('mat-card')).toHaveCount(30);
});
```