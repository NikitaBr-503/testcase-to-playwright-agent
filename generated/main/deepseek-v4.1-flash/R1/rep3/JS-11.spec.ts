import { test, expect } from '../../../../../support/fixtures';
test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context without any session is used.

  // Step 1
  await page.goto('/');
  await expect(page.locator('mat-paginator')).toBeVisible();

  // Step 2
  const itemsPerPageSelect = page.locator('mat-paginator').getByRole('combobox');
  await itemsPerPageSelect.click();
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.locator('mat-paginator').getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('button', { name: 'Add to Basket' })).toHaveCount(30);
});
