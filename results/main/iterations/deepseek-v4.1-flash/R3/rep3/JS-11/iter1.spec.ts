import { test, expect } from '../../../../../support/fixtures';
test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in - no authentication steps are performed.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page:' });
  await expect(itemsPerPage).toBeVisible();
  await itemsPerPage.click();
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  const rangeStatus = page.getByRole('status').filter({ hasText: 'of 46' });
  await expect(rangeStatus).toBeVisible();
  await expect(rangeStatus).toHaveText(/1\s*[–-]\s*30 of 46/);

  // Expected 2
  await expect(page.getByRole('article')).toHaveCount(30);
});
