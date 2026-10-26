```ts
import { test, expect } from '@playwright/test';

test('JS-10: Перехід на наступну сторінку каталогу', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in - no authentication steps are performed.

  // Step 1
  await page.goto('/');

  // sanity check: the product from the first page is present before paging
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Next page' }).click();

  // Expected 1
  await expect(page.getByText(/16\s*[–—-]\s*30\s*of\s*46/)).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toHaveCount(0);
});
```