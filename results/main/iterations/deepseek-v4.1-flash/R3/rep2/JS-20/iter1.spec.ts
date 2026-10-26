import { test, expect } from '../../../../../support/fixtures';
test('JS-20 Change the quantity of a product in the basket', async ({ page }) => {
  // Preconditions
  // - The welcome dialog and the cookie banner are already dismissed by the test environment.
  // - The user qa_user@example.com is registered.
  // - The basket of the user is empty.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page.getByLabel('Password')).toBeHidden();

  // Step 7
  await page
    .getByRole('article')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();
  await expect(page.getByRole('button', { name: /shopping cart/i })).toContainText('Your Basket 1');

  // Step 8
  await page.getByRole('button', { name: /shopping cart/i }).click();

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await basketRow
    .locator('button:has(.fa-plus-square), button:has(.fa-plus), button[aria-label*="increase" i]')
    .click();

  // Expected 1
  await expect(basketRow.getByText('2', { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/Total Price:\s*3\.98¤/).last()).toBeVisible();

  // Step 10
  await basketRow
    .locator('button:has(.fa-minus-square), button:has(.fa-minus), button[aria-label*="decrease" i]')
    .click();

  // Expected 2
  await expect(basketRow.getByText('1', { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/Total Price:\s*1\.99¤/).last()).toBeVisible();
});
