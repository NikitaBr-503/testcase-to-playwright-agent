import { test, expect } from '../../../../../support/fixtures';
test('JS-03 Пошук товарів за назвою', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (account menu shows the anonymous "Account" state).
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toHaveText(/Account/);

  // Step 1
  await expect(page.getByRole('button', { name: 'Back to homepage' })).toBeVisible();
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Open search' }).click();

  // Step 3
  const searchInput = page.getByRole('textbox').first();
  await expect(searchInput).toBeVisible();
  await searchInput.fill('apple');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - apple').first()).toBeVisible();

  // Expected 2
  const products = page.getByRole('article');
  await expect(products).toHaveCount(3);
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Apple Pomace', { exact: true })).toBeVisible();
  await expect(page.getByText('Pineapple Juice (1000ml)', { exact: true })).toBeVisible();
});
