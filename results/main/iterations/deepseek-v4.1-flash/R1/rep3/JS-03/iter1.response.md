```ts
import { test, expect } from '@playwright/test';

test('JS-03 Пошук товарів за назвою', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in - no authentication is performed in this test.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Search' }).click();

  // Step 3
  const searchInput = page.getByPlaceholder(/search/i);
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - apple', { exact: true }).first()).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Apple Pomace', { exact: true })).toBeVisible();
  await expect(page.getByText('Pineapple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.locator('mat-grid-tile')).toHaveCount(3);
});
```