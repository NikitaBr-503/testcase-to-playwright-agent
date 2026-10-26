```ts
import { test, expect } from '@playwright/test';

test('JS-10: Перехід на наступну сторінку каталогу', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('Apple Juice (1000ml)')).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Next page' }).click();

  // Expected 1
  await expect(page.getByText('16 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)')).toHaveCount(0);
});
```