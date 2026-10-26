```ts
import { test, expect } from '@playwright/test';

test('JS-11: Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in, so no authentication is performed.

  // Step 1
  await page.goto('/');

  // Step 2
  const itemsPerPageSelect = page.getByRole('combobox', { name: 'Items per page' });
  await expect(itemsPerPageSelect).toBeVisible();
  await itemsPerPageSelect.click();
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.locator('mat-card')).toHaveCount(30);
});
```