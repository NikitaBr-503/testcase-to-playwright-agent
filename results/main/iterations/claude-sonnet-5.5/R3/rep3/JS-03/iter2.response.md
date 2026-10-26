The failure came from the substring match: `hasText: 'Apple Juice (1000ml)'` also matches the "Pineapple Juice (1000ml)" article, because "Pineapple" contains "apple" and the match is case-insensitive. That gave 2 matches instead of 1. The fix is to match the product names exactly, using the product image's accessible name inside each article.

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
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - apple')).toBeVisible();

  // Expected 2
  const items = page.getByRole('article');
  await expect(items).toHaveCount(3);
  await expect(page.getByRole('img', { name: 'Apple Juice (1000ml)', exact: true })).toHaveCount(1);
  await expect(page.getByRole('img', { name: 'Apple Pomace', exact: true })).toHaveCount(1);
  await expect(page.getByRole('img', { name: 'Pineapple Juice (1000ml)', exact: true })).toHaveCount(1);
  await expect(items.getByRole('img', { name: 'Apple Juice (1000ml)', exact: true })).toBeVisible();
  await expect(items.getByRole('img', { name: 'Apple Pomace', exact: true })).toBeVisible();
  await expect(items.getByRole('img', { name: 'Pineapple Juice (1000ml)', exact: true })).toBeVisible();
});
```