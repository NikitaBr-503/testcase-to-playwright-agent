```ts
import { test, expect } from '@playwright/test';

test('JS-03: Пошук товарів за назвою', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.locator('mat-icon', { hasText: 'search' }).first().click();

  // Step 3
  const searchInput = page.getByRole('textbox', { name: /search/i });
  await expect(searchInput).toBeVisible();
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page).toHaveURL(/\/search\?q=apple/);
  await expect(page.getByText('Search Results - apple')).toBeVisible();

  // Expected 2
  const productNames = page.locator('mat-card .item-name');
  await expect(productNames).toHaveCount(3);
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Apple Pomace', { exact: true })).toBeVisible();
  await expect(page.getByText('Pineapple Juice (1000ml)', { exact: true })).toBeVisible();
});
```