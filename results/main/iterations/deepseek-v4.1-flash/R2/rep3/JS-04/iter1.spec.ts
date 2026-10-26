import { test, expect } from '../../../../../support/fixtures';
test('JS-04 Пошук товару, якого немає в каталозі', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // Step 1
  await page.goto('/');

  // Preconditions: the user is not logged in (account menu shows the anonymous "Account" label)
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toContainText('Account');

  // Step 2
  await page.getByRole('button', { name: 'Open search' }).click();
  const searchBox = page.getByRole('textbox');
  await expect(searchBox).toBeVisible();

  // Step 3
  await searchBox.fill('zzzz');
  await searchBox.press('Enter');

  // Expected 1
  await expect(page.getByText('No results found')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('article')).toHaveCount(0);
});
