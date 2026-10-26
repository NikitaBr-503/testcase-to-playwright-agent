import { test, expect } from '../../../../../support/fixtures';
test('JS-03 Пошук товарів за назвою', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user is not logged in (the account menu shows the anonymous "Account" entry).

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  const searchInput = page.getByRole('textbox');
  if (!(await searchInput.isVisible())) {
    await page.getByRole('button', { name: 'Open search' }).click();
  }
  await expect(searchInput).toBeVisible();

  // Step 3
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - apple', { exact: true })).toBeVisible();

  // Expected 2
  await expect(
    page.getByRole('button', { name: 'Click for more information about the product' })
  ).toHaveCount(3);
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Apple Pomace', { exact: true })).toBeVisible();
  await expect(page.getByText('Pineapple Juice (1000ml)', { exact: true })).toBeVisible();
});
