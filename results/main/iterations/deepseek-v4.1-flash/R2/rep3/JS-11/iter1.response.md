```ts
import { test, expect } from '@playwright/test';

test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // - Welcome dialog and cookie banner are already dismissed by the test environment.
  // - The user is not logged in: no session is established in this test.

  // Step 1
  await page.goto('/');

  // Step 2
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page:' });
  await expect(itemsPerPage).toBeVisible();
  await itemsPerPage.click();
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.getByRole('status').filter({ hasText: 'of 46' })).toHaveText('1 – 30 of 46');

  // Expected 2
  await expect(page.getByRole('main').getByRole('article')).toHaveCount(30);
});
```