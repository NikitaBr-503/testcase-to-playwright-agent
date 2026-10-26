import { test, expect } from '../../../../../support/fixtures';
test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in - the account menu still shows the anonymous "Account" label.
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toContainText('Account');

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('main').getByText('All Products', { exact: true })).toBeVisible();
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page:' });
  await expect(itemsPerPage).toBeVisible();

  // Step 2
  // The paginator's touch-target overlay intercepts pointer events on the select,
  // so the dropdown is opened via the keyboard instead of a mouse click.
  // Also wait for the transient "Language has been changed to English" snackbar to
  // disappear so that it cannot intercept the interaction with the dropdown.
  await expect(page.getByText('Language has been changed to English')).toBeHidden({ timeout: 15000 });
  await itemsPerPage.focus();
  await page.keyboard.press('Enter');
  const option30 = page.getByRole('option', { name: '30', exact: true });
  await expect(option30).toBeVisible();
  await option30.click();

  // Expected 1
  const paginator = page
    .getByRole('group')
    .filter({ has: page.getByRole('combobox', { name: 'Items per page:' }) });
  await expect(paginator.getByRole('status')).toHaveText('1 – 30 of 46');

  // Expected 2
  await expect(page.getByRole('main').getByRole('article')).toHaveCount(30);
});
