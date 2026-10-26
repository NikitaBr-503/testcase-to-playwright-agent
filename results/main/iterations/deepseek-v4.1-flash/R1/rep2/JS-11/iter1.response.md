```ts
import { test, expect } from '@playwright/test';

test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in, so no authentication steps are performed.

  // Step 1
  await page.goto('/');

  // Step 2
  const itemsPerPageSelect = page.getByLabel('Items per page');
  await expect(itemsPerPageSelect).toBeVisible();
  await itemsPerPageSelect.selectOption('30');
  await expect(itemsPerPageSelect).toHaveValue('30');

  // Expected 1
  await expect(page.getByText(/1\s*[–-]\s*30 of 46/)).toBeVisible();

  // Expected 2
  await expect(page.getByTestId('product-card')).toHaveCount(30);
});
```