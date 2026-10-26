import { test, expect } from '../../../../../support/fixtures';
test('JS-04 Пошук товару, якого немає в каталозі', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in (no login performed).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /search/i }).click();

  // Step 3
  const searchInput = page.getByRole('searchbox');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('zzzz');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('No results found')).toBeVisible();

  // Expected 2
  await expect(page.getByTestId('product-card')).toHaveCount(0);
});
