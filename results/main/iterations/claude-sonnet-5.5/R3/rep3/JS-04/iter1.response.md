```ts
import { test, expect } from '@playwright/test';

test('JS-04 Пошук товару, якого немає в каталозі', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('main').getByRole('article').first()).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Open search' }).click();

  // Step 3
  const searchInput = page.getByRole('textbox');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('zzzz');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('No results found')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('article')).toHaveCount(0);
});
```