```ts
import { test, expect } from '@playwright/test';

test('JS-03 Пошук товарів за назвою', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context without any session is used.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /search/i }).click();

  // Step 3
  const searchInput = page.getByRole('textbox', { name: /search/i });
  await expect(searchInput).toBeVisible();
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Search Results - apple' })).toBeVisible();

  // Expected 2
  const productTiles = page.locator('mat-grid-tile');
  await expect(productTiles).toHaveCount(3);
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Apple Pomace', { exact: true })).toBeVisible();
  await expect(page.getByText('Pineapple Juice (1000ml)', { exact: true })).toBeVisible();
});
```