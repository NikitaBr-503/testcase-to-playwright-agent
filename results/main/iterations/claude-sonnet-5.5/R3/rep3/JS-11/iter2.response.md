```ts
import { test, expect } from '@playwright/test';

test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  // A snackbar overlay can intercept pointer events, so the select is operated via the keyboard.
  const pageSize = page.getByRole('combobox', { name: 'Items per page:' });
  await expect(pageSize).toBeVisible();
  await pageSize.focus();
  await pageSize.press('Enter');
  const option30 = page.getByRole('option', { name: '30', exact: true });
  await expect(option30).toBeVisible();
  await option30.focus();
  await option30.press('Enter');

  // Expected 1
  await expect(page.getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.locator('mat-card')).toHaveCount(30);
});
```