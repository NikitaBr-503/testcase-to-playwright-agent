import { test, expect } from '../../../../../support/fixtures';
test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are dismissed by the environment.
  // The user is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  const productCard = page.locator('mat-card', { hasText: 'Apple Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Your Basket' }).click();

  // Step 9
  const row = page.locator('mat-row', { hasText: 'Apple Juice (1000ml)' });
  await expect(row).toBeVisible();
  await row.locator('button').filter({ has: page.locator('svg[data-icon="plus-square"]') }).click();

  // Expected 1
  await expect(row.locator('mat-cell').filter({ hasText: /^\s*2\s*$/ })).toBeVisible();
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await row.locator('button').filter({ has: page.locator('svg[data-icon="minus-square"]') }).click();

  // Expected 2
  await expect(row.locator('mat-cell').filter({ hasText: /^\s*1\s*$/ })).toBeVisible();
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
