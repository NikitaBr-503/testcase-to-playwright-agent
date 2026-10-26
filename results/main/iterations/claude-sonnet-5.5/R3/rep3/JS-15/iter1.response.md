```ts
import { test, expect } from '@playwright/test';

test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered; the basket is empty at the start of a fresh session.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: false }).first().fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();

  // Step 7
  const appleCard = page.locator('mat-card', { hasText: 'Apple Juice (1000ml)' });
  await appleCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaCard = page.locator('mat-card', { hasText: 'Banana Juice (1000ml)' });
  await bananaCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('2');

  // Step 9
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 2
  const appleRow = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  const bananaRow = page.getByRole('row', { name: /Banana Juice \(1000ml\)/ });
  await expect(appleRow).toBeVisible();
  await expect(bananaRow).toBeVisible();
  await expect(appleRow.getByRole('cell').filter({ hasText: /^\s*1\s*$/ })).toBeVisible();
  await expect(bananaRow.getByRole('cell').filter({ hasText: /^\s*1\s*$/ })).toBeVisible();

  // Expected 3
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();
});
```