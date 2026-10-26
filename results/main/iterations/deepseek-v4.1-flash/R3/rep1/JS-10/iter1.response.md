```ts
import { test, expect } from '@playwright/test';

test('JS-10 Перехід на наступну сторінку каталогу', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in - no login steps are performed.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('1 – 15 of 46');

  // Step 2
  await page.getByRole('button', { name: 'Next page' }).click();

  // Expected 1
  await expect(page.getByRole('status')).toHaveText('16 – 30 of 46');

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)')).toHaveCount(0);
});
```