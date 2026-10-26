```ts
import { test, expect } from '@playwright/test';

test('JS-19: Пошук товару та додавання його до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the test environment;
  // user qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^log ?in$/i }).click();

  // Step 7
  await expect(page.getByRole('button', { name: /shopping cart/i })).toBeVisible();
  await page.locator('#searchQuery').click();

  // Step 8
  const searchInput = page.getByPlaceholder('Search...');
  await searchInput.fill('banana');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - banana')).toBeVisible();

  // Step 9
  const productCard = page
    .locator('mat-card')
    .filter({ hasText: 'Banana Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 2
  await expect(
    page.getByText('Placed Banana Juice (1000ml) into basket.')
  ).toBeVisible();

  // Expected 3
  await expect(page.getByRole('button', { name: /shopping cart/i })).toContainText('1');
});
```