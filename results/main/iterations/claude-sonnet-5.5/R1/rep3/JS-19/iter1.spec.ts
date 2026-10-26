import { test, expect } from '../../../../../support/fixtures';
test('JS-19: Пошук товару та додавання його до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the test environment,
  // user qa_user@example.com is registered and has an empty basket.
  const email = 'qa_user@example.com';
  const password = 'QaPassword123!';

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill(email);

  // Step 5
  await page.locator('#password').fill(password);

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page.locator('#searchQuery').click();

  // Step 8
  const searchInput = page.getByPlaceholder('Search...');
  await searchInput.fill('banana');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - banana')).toBeVisible();

  // Step 9
  await page
    .locator('mat-card')
    .filter({ hasText: 'Banana Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Expected 2
  await expect(page.getByText('Placed Banana Juice (1000ml) into basket.')).toBeVisible();

  // Expected 3
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');
});
