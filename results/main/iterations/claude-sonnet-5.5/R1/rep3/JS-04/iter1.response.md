```ts
import { test, expect } from '@playwright/test';

test('JS-04 Пошук товару, якого немає в каталозі', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Click to search' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Click to search' }).click();
  const searchInput = page.getByPlaceholder('Search...');
  await expect(searchInput).toBeVisible();

  // Step 3
  await searchInput.fill('zzzz');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page).toHaveURL(/search\?q=zzzz/);
  await expect(page.getByText('No results found')).toBeVisible();

  // Expected 2
  await expect(page.locator('mat-grid-tile')).toHaveCount(0);
});
```