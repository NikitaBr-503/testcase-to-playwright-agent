import { test, expect } from '../../../../../support/fixtures';
test('JS-04 Пошук товару, якого немає в каталозі', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in - no authentication performed here.

  // Step 1
  await page.goto('/');

  const searchTrigger = page
    .getByRole('button', { name: /search/i })
    .or(page.getByRole('link', { name: /search/i }))
    .first();

  // Step 2
  await expect(searchTrigger).toBeVisible();
  await searchTrigger.click();

  const searchInput = page
    .getByRole('textbox')
    .or(page.getByPlaceholder(/search/i))
    .or(page.getByRole('textbox', { name: /search/i }))
    .first();

  // Step 3
  await expect(searchInput).toBeVisible();
  await searchInput.fill('zzzz');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('No results found')).toBeVisible();

  // Expected 2
  const productCards = page.getByRole('article');


  await expect(productCards).toHaveCount(0);
});
