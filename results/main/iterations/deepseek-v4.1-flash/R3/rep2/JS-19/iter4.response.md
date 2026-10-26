```ts
import { test, expect } from '@playwright/test';

test('JS-19 Пошук товару та додавання його до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  await page.goto('/');
  // Registered user qa_user@example.com exists; the basket must be empty.
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('0');

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page
    .getByRole('textbox', { name: 'Text field for the login email' })
    .fill('qa_user@example.com');

  // Step 5
  await page
    .getByRole('textbox', { name: 'Text field for the login password' })
    .fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  // Login succeeded: the app navigates away from the login page.
  await expect(page).not.toHaveURL(/#\/login/);

  // Step 7
  await page.getByRole('button', { name: 'Open search' }).click();

  // Step 8
  const searchInput = page.getByRole('textbox');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('banana');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Search Results - banana' })).toBeVisible();

  // Step 9
  const bananaCard = page.locator('article').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(bananaCard).toBeVisible();
  await bananaCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 2
  await expect(page.getByText('Placed Banana Juice (1000ml) into basket.')).toBeVisible();

  // Expected 3
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');
});
```