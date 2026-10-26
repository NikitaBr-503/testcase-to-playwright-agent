import { test, expect } from '../../../../../support/fixtures';
test('JS-04 Пошук товару, якого немає в каталозі', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the test environment; the user is not logged in (fresh browser context).

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('article').first()).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Open search' }).click();
  const searchInput = page.getByRole('textbox');
  await expect(searchInput).toBeVisible();

  // Step 3
  await searchInput.fill('zzzz');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page).toHaveURL(/search\?q=zzzz/);
  await expect(page.getByText('No results found')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('article')).toHaveCount(0);
});
