import { test, expect } from '../../../../../support/fixtures';
test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  // A snackbar and the paginator touch target intercept pointer clicks, so the select is
  // opened with the keyboard and the option is activated without relying on pointer hit-testing.
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page:' });
  await itemsPerPage.focus();
  await itemsPerPage.press('Enter');
  const option30 = page.getByRole('option', { name: '30', exact: true });
  await expect(option30).toBeVisible();
  await option30.dispatchEvent('click');

  // Expected 1
  await expect(page.getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('main').getByRole('article')).toHaveCount(30);
});
