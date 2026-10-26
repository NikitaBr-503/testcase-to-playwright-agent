```ts
import { test, expect } from '@playwright/test';

test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login steps are performed).

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  const itemsPerPageSelect = page.getByRole('combobox', { name: 'Items per page:' });
  await itemsPerPageSelect.click();
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.getByText('1 – 30 of 46', { exact: true })).toBeVisible();

  // Expected 2
  await expect(page.getByRole('main').getByRole('article')).toHaveCount(30);
});
```