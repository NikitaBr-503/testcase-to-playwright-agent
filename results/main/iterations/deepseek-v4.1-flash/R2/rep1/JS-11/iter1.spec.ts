import { test, expect } from '../../../../../support/fixtures';
test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // - Welcome dialog and cookie banner are already dismissed by the test environment
  // - The user is not logged in: a fresh browser context is used, so no session exists

  // Step 1
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Click for more information about the product' }).first()
  ).toBeVisible();

  // Step 2
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page:' });
  await expect(itemsPerPage).toBeVisible();
  await itemsPerPage.click();
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('main').getByRole('article')).toHaveCount(30);
});
