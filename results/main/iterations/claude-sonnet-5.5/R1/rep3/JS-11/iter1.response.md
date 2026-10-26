```ts
import { test, expect } from '@playwright/test';

test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the test environment;
  // a fresh browser context guarantees that the user is not logged in.

  // Step 1
  await page.goto('/');
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page:' });
  await expect(itemsPerPage).toBeVisible();

  // Step 2
  await itemsPerPage.click();
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.locator('mat-grid-tile')).toHaveCount(30);
});
```