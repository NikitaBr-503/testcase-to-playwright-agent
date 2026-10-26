import { test, expect } from '../../../../../support/fixtures';
test('JS-19 Пошук товару та додавання його до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered; the basket is empty for this user.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Account' })).toBeVisible();

  // Step 7
  await page.getByRole('button', { name: 'Search' }).click();

  // Step 8
  const searchInput = page.getByPlaceholder('Search...');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('banana');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - banana')).toBeVisible();

  // Step 9
  const bananaJuiceCard = page
    .locator('mat-card')
    .filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(bananaJuiceCard).toBeVisible();
  await bananaJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 2
  await expect(
    page.getByText('Placed Banana Juice (1000ml) into basket.')
  ).toBeVisible();

  // Expected 3
  await expect(
    page.getByRole('button', { name: 'Show the shopping cart' })
  ).toContainText('1');
});
