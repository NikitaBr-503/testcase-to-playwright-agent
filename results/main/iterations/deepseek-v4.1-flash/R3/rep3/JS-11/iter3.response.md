```ts
import { test, expect } from '@playwright/test';

test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user is not logged in, so no authentication steps are performed.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page:' });
  await expect(itemsPerPage).toBeVisible();
  // The paginator's touch-target overlay intercepts pointer clicks on the select,
  // so the dropdown is opened with the keyboard, the way a keyboard user would.
  await itemsPerPage.press('Enter');
  const option30 = page.getByRole('option', { name: '30', exact: true });
  await expect(option30).toBeVisible();
  await option30.click();

  // Expected 1
  const rangeStatus = page.getByRole('status').filter({ hasText: 'of 46' });
  await expect(rangeStatus).toBeVisible();
  await expect(rangeStatus).toHaveText(/^\s*1\s*[–—-]\s*30 of 46\s*$/);

  // Expected 2
  await expect(page.getByRole('article')).toHaveCount(30);
});
```