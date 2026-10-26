import { test, expect } from '../../../../../support/fixtures';
test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the test environment.
  // User qa_user@example.com is registered. Basket must be empty - ensured below by logging in
  // and adding only one product, then verifying totals.

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

  // Step 7
  await page
    .getByRole('button', { name: 'Add to Basket' })
    .filter({ has: page.locator(':scope') })
    .first()
    .click();

  // Step 8
  await page.getByRole('button', { name: 'Your Basket' }).click();

  // Step 9
  const productRow = page.getByRole('row', { name: /Apple Juice \(1000ml\)/ });
  await expect(productRow).toBeVisible();
  await productRow.getByRole('button', { name: '+' }).click();

  // Expected 1
  await expect(productRow.getByRole('button', { name: '+' })).toBeVisible();
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await productRow.getByRole('button', { name: '−' }).click();

  // Expected 2
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
