import { test, expect } from '../../../../../support/fixtures';
test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  const itemsPerPage = page.getByRole('combobox', { name: 'Items per page' });
  await expect(itemsPerPage).toBeVisible();

  // Step 2
  await expect(page.getByText('Language has been changed to English')).toBeHidden({ timeout: 15000 });
  await itemsPerPage.focus();
  await page.keyboard.press('Enter');
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('article')).toHaveCount(30);
});
