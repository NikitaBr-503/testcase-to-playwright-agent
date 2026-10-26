import { test, expect } from '../../../../../support/fixtures';
test('JS-25 Повне оформлення замовлення з оплатою карткою', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are dismissed by the test environment.
  // The user qa_user@example.com is registered, logged out, with an empty basket,
  // and has no saved addresses or cards.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.locator('#email').fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.locator('#loginButton').click();

  // Step 7
  await page
    .getByRole('article')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  await page.getByRole('button', { name: /Checkout/ }).click();

  // Step 10
  await page.getByRole('button', { name: /Add New Address/ }).click();

  // Step 11
  await page.getByPlaceholder(/country/i).fill('Ukraine');

  // Step 12
  await page.getByPlaceholder(/name/i).fill('QA User');

  // Step 13
  await page.getByPlaceholder(/mobile number/i).fill('5012345678');

  // Step 14
  await page.getByPlaceholder(/ZIP code/i).fill('01001');

  // Step 15
  await page.getByPlaceholder(/address/i).fill('Khreshchatyk 1');

  // Step 16
  await page.getByPlaceholder(/city/i).fill('Kyiv');

  // Step 17
  await page.getByPlaceholder(/state/i).fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: /Submit/ }).click();

  // Step 19
  await page.getByRole('row', { name: /QA User/ }).click();

  // Step 20
  await page.getByRole('button', { name: /Continue/ }).click();

  // Step 21
  await page.getByRole('row', { name: /Standard Delivery/ }).click();

  // Step 22
  await page.getByRole('button', { name: /Continue/ }).click();

  // Step 23
  await page.getByRole('button', { name: /Add new card/ }).click();

  // Step 24
  await page.getByLabel('Name').fill('QA User');

  // Step 25
  await page.getByLabel('Card Number').fill('4111111111111111');

  // Step 26
  await page.getByLabel('Expiry Month').selectOption('12');

  // Step 27
  await page.getByLabel('Expiry Year').selectOption('2090');

  // Step 28
  await page.getByRole('button', { name: /Submit/ }).click();

  // Step 29
  await page.getByRole('row', { name: /1111/ }).click();

  // Step 30
  await page.getByRole('button', { name: /Continue/ }).click();

  // Step 31
  await page.getByRole('button', { name: /Place your order and pay/ }).click();

  // Expected 1
  await expect(page.getByText('Thank you for your purchase!')).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)').first()).toBeVisible();

  // Step 32
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 33
  await page.getByRole('menuitem', { name: /Orders & Payment/ }).click();

  // Step 34
  await page.getByRole('menuitem', { name: /Order History/ }).click();

  // Expected 3
  const latestOrder = page.locator('mat-card').first();
  await expect(latestOrder).toContainText('Apple Juice (1000ml)');
  await expect(latestOrder).toContainText('In Transit');
});
