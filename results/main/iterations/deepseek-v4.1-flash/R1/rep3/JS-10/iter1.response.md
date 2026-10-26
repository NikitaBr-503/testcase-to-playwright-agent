```ts
import { test, expect } from '@playwright/test';

test('JS-10 Перехід на наступну сторінку каталогу', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in - no authentication is performed in this test.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Next page' }).click();

  // Expected 1
  await expect(page.getByText(/16\s*[–-]\s*30 of 46/)).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toHaveCount(0);
});
```