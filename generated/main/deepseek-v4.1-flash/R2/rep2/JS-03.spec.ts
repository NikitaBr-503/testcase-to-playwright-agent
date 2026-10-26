import { test, expect } from '../../../../../support/fixtures';
test('JS-03 Пошук товарів за назвою', async ({ page }) => {
  // Preconditions: welcome dialog and cookie banner are already dismissed by the test
  // environment; the user is not logged in (no authentication steps are performed).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Open search' }).click();

  // Step 3
  const searchInput = page.getByRole('textbox');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - apple', { exact: true })).toBeVisible();

  // Expected 2
  await expect(page.getByRole('button', { name: 'Add to Basket' })).toHaveCount(3);
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Apple Pomace', { exact: true })).toBeVisible();
  await expect(page.getByText('Pineapple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Banana Juice (1000ml)', { exact: true })).toHaveCount(0);
});
