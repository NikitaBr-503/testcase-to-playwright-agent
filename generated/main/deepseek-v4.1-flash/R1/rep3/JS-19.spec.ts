import { test, expect } from '../../../../../support/fixtures';
test('JS-19 Пошук товару та додавання його до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered; the basket is expected to be empty.
  await page.goto('/');
  await expect(page.getByRole('button', { name: /Account/i })).toBeVisible();

  // Step 1
  // (main page is already opened in the preconditions block above)

  // Step 2
  await page.getByRole('button', { name: /Account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: /Account/i })).toContainText('qa_user@example.com');

  // Step 7
  await page.getByRole('button', { name: 'Search' }).click();

  // Step 8
  const searchInput = page.getByRole('searchbox');
  await searchInput.fill('banana');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Search Results - banana' })).toBeVisible();

  // Step 9
  const productCard = page
    .locator('.product')
    .filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(productCard).toBeVisible();
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 2
  await expect(page.getByText('Placed Banana Juice (1000ml) into basket.')).toBeVisible();

  // Expected 3
  await expect(page.getByRole('button', { name: /Show the shopping cart/i })).toContainText('1');
});
