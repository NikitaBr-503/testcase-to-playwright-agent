```ts
import { test, expect } from '@playwright/test';

test('JS-04 Пошук товару, якого немає в каталозі', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Open search' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Open search' }).click();

  // Step 3
  const searchBox = page.getByRole('textbox');
  await expect(searchBox).toBeVisible();
  await searchBox.fill('zzzz');
  await searchBox.press('Enter');

  // Expected 1
  await expect(page.getByText('No results found')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('article')).toHaveCount(0);
});
```