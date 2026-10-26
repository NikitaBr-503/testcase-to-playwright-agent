import { test, expect } from '../../../../../support/fixtures';
test('JS-04 Пошук товару, якого немає в каталозі', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login steps performed).

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: /search/i }).first()).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: /search/i }).first().click();

  // Step 3
  const searchInput = page.getByPlaceholder(/search/i);
  await expect(searchInput).toBeVisible();
  await searchInput.fill('zzzz');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('No results found')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('button', { name: /add to basket/i })).toHaveCount(0);
  await expect(page.locator('mat-card.product')).toHaveCount(0);
});
