```ts
import { test, expect } from '@playwright/test';

test('JS-03: Пошук товарів за назвою', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login steps are performed).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Open search' }).click();

  // Step 3
  const searchBox = page.getByRole('textbox');
  await expect(searchBox).toBeVisible();
  await searchBox.fill('apple');
  await searchBox.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - apple', { exact: true })).toBeVisible();

  // Expected 2
  const products = page.getByRole('article');
  await expect(products).toHaveCount(3);
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Apple Pomace', { exact: true })).toBeVisible();
  await expect(page.getByText('Pineapple Juice (1000ml)', { exact: true })).toBeVisible();
});
```