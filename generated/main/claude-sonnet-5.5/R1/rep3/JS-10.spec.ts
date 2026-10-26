import { test, expect } from '../../../../../support/fixtures';
test('JS-10: Перехід на наступну сторінку каталогу', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed; user is not logged in (fresh browser context).

  // Step 1
  await page.goto('/');

  // Expected 1
  await expect(page.getByText('Apple Juice (1000ml)')).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Next page' }).click();

  // Expected 2
  await expect(page.getByText(/16\s*–\s*30\s*of\s*46/)).toBeVisible();
  await expect(page.getByText('Apple Juice (1000ml)')).toHaveCount(0);
});
