```ts
import { test, expect } from '@playwright/test';

test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  // The paginator's touch-target overlay intercepts pointer events on the select,
  // so open it via the keyboard like a user would.
  const pageSize = page.getByRole('combobox', { name: 'Items per page:' });
  await expect(pageSize).toBeVisible();
  await pageSize.focus();
  await pageSize.press('Enter');
  await expect(pageSize).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('article')).toHaveCount(30);
});
```