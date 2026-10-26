```ts
import { test, expect } from '@playwright/test';

test('JS-19 Пошук товару та додавання його до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the test environment.
  // The registered user qa_user@example.com has an empty basket (new session).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Text field for the login email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();

  // Step 7
  await page.getByRole('button', { name: 'Open search' }).click();

  // Step 8
  const searchInput = page.getByRole('textbox');
  await searchInput.fill('banana');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - banana')).toBeVisible();

  // Step 9
  const bananaCard = page.getByRole('article').filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 2
  await expect(page.getByText('Placed Banana Juice (1000ml) into basket.')).toBeVisible();

  // Expected 3
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');
});
```