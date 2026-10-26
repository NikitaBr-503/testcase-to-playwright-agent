```ts
import { test, expect } from '@playwright/test';

test('JS-03: Пошук товарів за назвою', async ({ page }) => {
  // Preconditions
  // User is not logged in; welcome dialog and cookie banner are already dismissed.
  await page.context().clearCookies();

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Click to search' }).click();

  // Step 3
  const searchInput = page.getByRole('textbox', { name: 'Search...' });
  await expect(searchInput).toBeVisible();
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - apple')).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Apple Pomace', { exact: true })).toBeVisible();
  await expect(page.getByText('Pineapple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.locator('mat-card.mat-mdc-card')).toHaveCount(3);
});
```