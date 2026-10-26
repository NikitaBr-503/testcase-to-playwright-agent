```ts
import { test, expect } from '@playwright/test';

test('JS-03 Пошук товарів за назвою', async ({ page }) => {
  // Preconditions: the welcome dialog and the cookie banner are already dismissed by the
  // test environment, and the user is not logged in (no login step is performed).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Search', exact: true }).click();

  // Step 3
  const searchInput = page.getByPlaceholder('Search...');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Search Results - apple' })).toBeVisible();

  // Expected 2
  await expect(page.locator('mat-card')).toHaveCount(3);
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Apple Pomace', { exact: true })).toBeVisible();
  await expect(page.getByText('Pineapple Juice (1000ml)', { exact: true })).toBeVisible();
});
```