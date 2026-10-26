```ts
import { test, expect } from '@playwright/test';

test('JS-03 Пошук товарів за назвою', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Open search' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Open search' }).click();

  // Step 3
  const searchInput = page.getByRole('textbox');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - apple')).toBeVisible();

  // Expected 2
  const items = page.locator('mat-card');
  await expect(items).toHaveCount(3);
  await expect(page.getByRole('img', { name: 'Apple Juice (1000ml)', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Apple Pomace', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Pineapple Juice (1000ml)', exact: true })).toBeVisible();
});
```