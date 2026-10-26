import { test, expect } from '../../../../../support/fixtures';
test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  // The pointer click on the select is intercepted by the snackbar and the paginator touch target,
  // so the dropdown is opened via the keyboard and the option is activated via a click event.
  const pageSizeSelect = page.getByRole('combobox', { name: 'Items per page:' });
  await pageSizeSelect.focus();
  await pageSizeSelect.press('Enter');
  const option30 = page.getByRole('option', { name: '30', exact: true });
  await expect(option30).toBeVisible();
  await option30.dispatchEvent('click');

  // Expected 1
  await expect(page.getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('main').locator('article')).toHaveCount(30);
});
