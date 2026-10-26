import { test, expect } from '../../../../../support/fixtures';
test('JS-10 Перехід на наступну сторінку каталогу', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (no login step is performed).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Next page' }).click();

  // Expected 1
  await expect(page.getByRole('status')).toHaveText('16 – 30 of 46');

  // Expected 2
  await expect(page.getByRole('img', { name: 'Apple Juice (1000ml)' })).toHaveCount(0);
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toHaveCount(0);
});
