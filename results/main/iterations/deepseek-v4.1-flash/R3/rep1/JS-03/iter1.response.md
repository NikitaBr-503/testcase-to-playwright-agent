```ts
import { test, expect } from '@playwright/test';

test('JS-03 Пошук товарів за назвою', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login steps are performed).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Open search' }).click();
  const searchInput = page.getByRole('textbox');
  await expect(searchInput).toBeVisible();

  // Step 3
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Search Results - apple' })).toBeVisible();

  // Expected 2
  const products = page.getByRole('article');
  await expect(products).toHaveCount(3);
  await expect(page.getByRole('img', { name: 'Apple Juice (1000ml)', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Apple Pomace', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Pineapple Juice (1000ml)', exact: true })).toBeVisible();
});
```