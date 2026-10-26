```ts
import { test, expect } from '@playwright/test';

test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in - the account menu still shows the anonymous "Account" label.
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toHaveText(/Account/);

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('main').getByText('All Products', { exact: true })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Items per page:' })).toBeVisible();

  // Step 2
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page:' });
  await itemsPerPage.click();
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.getByRole('status')).toHaveText('1 – 30 of 46');

  // Expected 2
  await expect(page.getByRole('article')).toHaveCount(30);
});
```