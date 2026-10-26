import { test, expect } from '../../../../../support/fixtures';
test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions: the welcome dialog and the cookie banner are already dismissed by the test
  // environment, the user qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: /account menu/i })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: /account menu/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  // login completed: the app is back on the product overview again
  await expect(page.getByRole('button', { name: 'Add to Basket' }).first()).toBeVisible();

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceCard).toBeVisible();
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: /shopping cart/i }).click();

  const basketDialog = page.getByRole('dialog');
  await expect(basketDialog).toBeVisible();

  const basketRow = basketDialog.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();

  // Step 9
  // The quantity buttons are icon-only, so they are located by the icon class (or their aria-label).
  const increaseQuantityButton = basketRow
    .locator('button:has(i[class*="fa-plus"]), button[aria-label*="increase" i]')
    .first();
  await increaseQuantityButton.click();

  // Expected 1
  await expect(basketRow.getByText('2', { exact: true }).first()).toBeVisible();
  await expect(basketDialog).toContainText(/Total Price:\s*3\.98\s*¤/);

  // Step 10
  const decreaseQuantityButton = basketRow
    .locator('button:has(i[class*="fa-minus"]), button[aria-label*="decrease" i]')
    .first();
  await decreaseQuantityButton.click();

  // Expected 2
  await expect(basketRow.getByText('1', { exact: true }).first()).toBeVisible();
  await expect(basketDialog).toContainText(/Total Price:\s*1\.99\s*¤/);
});
