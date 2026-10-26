import { test, expect } from '../../../../../support/fixtures';
test('JS-11: Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in - no login steps are performed.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();

  // Step 2
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page' });
  await expect(itemsPerPage).toBeVisible();
  // The transient "language changed" snackbar overlays the paginator; wait until it is gone
  // so it cannot intercept the interaction.
  await expect(page.getByText('Language has been changed to English')).toBeHidden({ timeout: 15000 });
  // The paginator select is covered by the Material touch-target overlay, so open the
  // dropdown via keyboard instead of a pointer click.
  await itemsPerPage.focus();
  await page.keyboard.press('Enter');
  const option30 = page.getByRole('option', { name: '30', exact: true });
  await expect(option30).toBeVisible();
  await option30.click();

  // Expected 1
  const paginator = page
    .getByRole('group')
    .filter({ has: page.getByRole('combobox', { name: 'Items per page' }) });
  await expect(paginator.getByRole('status')).toHaveText('1 – 30 of 46');

  // Expected 2
  await expect(page.getByRole('main').getByRole('article')).toHaveCount(30);
});
