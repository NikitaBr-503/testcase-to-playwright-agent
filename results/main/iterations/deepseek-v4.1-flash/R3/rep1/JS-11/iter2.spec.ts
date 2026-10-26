import { test, expect } from '../../../../../support/fixtures';
test('JS-11: Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login steps are performed).

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Items per page' })).toBeVisible();

  // Step 2
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page' });
  await itemsPerPage.selectOption({ label: '30' });

  // Expected 1
  await expect(page.getByRole('status')).toHaveText('1 – 30 of 46');

  // Expected 2
  await expect(page.getByRole('main').getByRole('article')).toHaveCount(30);
});
