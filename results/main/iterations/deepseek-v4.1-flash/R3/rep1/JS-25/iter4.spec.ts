import { test, expect } from '../../../../../support/fixtures';
test('JS-25 Повне оформлення замовлення з оплатою карткою', async ({ page }) => {
  // Preconditions
  // - Welcome dialog and cookie banner are already dismissed by the test environment
  // - User qa_user@example.com is registered and is not logged in
  // - Basket is empty, no saved addresses and no saved cards

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByLabel('Text field for the login email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^log ?in$/i }).click();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout', exact: true }).click();

  // Step 10
  await page.getByRole('button', { name: /add (a )?new address/i }).click();

  // Step 11
  await page.getByLabel('Country', { exact: true }).fill('Ukraine');

  // Step 12
  await page.getByLabel('Name', { exact: true }).fill('QA User');

  // Step 13
  await page.getByLabel('Mobile Number', { exact: true }).fill('5012345678');

  // Step 14
  await page.getByLabel('ZIP Code', { exact: true }).fill('01001');

  // Step 15
  await page.getByLabel('Address', { exact: true }).fill('Khreshchatyk 1');

  // Step 16
  await page.getByLabel('City', { exact: true }).fill('Kyiv');

  // Step 17
  await page.getByLabel('State', { exact: true }).fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  // Step 19
  // The address radio has no accessible name of its own, so locate it through its row.
  const addressRow = page.getByRole('row').filter({ hasText: 'QA User' });
  await addressRow.getByRole('radio').check();

  // Step 20
  // The Continue button is exposed with an aria-label like "Proceed to payment selection".
  await page.getByRole('button', { name: /proceed|continue/i }).click();

  // Step 21
  await page.getByRole('radio', { name: /Standard Delivery/i }).check();

  // Step 22
  await page.getByRole('button', { name: /proceed|continue/i }).click();

  // Step 23
  await page.getByRole('button', { name: /add (a )?new card/i }).click();

  // Step 24
  await page.getByLabel('Name', { exact: true }).fill('QA User');

  // Step 25
  await page.getByLabel('Card Number', { exact: true }).fill('4111111111111111');

  // Step 26
  await page.getByLabel('Expiry Month').click();
  await page.getByRole('option', { name: '12', exact: true }).click();

  // Step 27
  await page.getByLabel('Expiry Year').click();
  await page.getByRole('option', { name: '2090', exact: true }).click();

  // Step 28
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  // Step 29
  // The saved card radio has no accessible name of its own, so locate it through its row.
  const cardRow = page.getByRole('row').filter({ hasText: '1111' });
  await cardRow.getByRole('radio').check();

  // Step 30
  await page.getByRole('button', { name: /proceed|continue/i }).click();

  // Step 31
  await page.getByRole('button', { name: 'Place your order and pay' }).click();

  // Expected 1
  await expect(page.getByText('Thank you for your purchase!')).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)').first()).toBeVisible();

  // Step 32
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 33
  await page.getByRole('menuitem', { name: /orders (&|and) payment/i }).click();

  // Step 34
  await page.getByRole('menuitem', { name: /order history/i }).click();

  // Expected 3
  // Row 0 is the table header, row 1 is the newest order.
  const newestOrder = page.getByRole('row').nth(1);
  await expect(newestOrder).toContainText('Apple Juice (1000ml)');
  await expect(newestOrder).toContainText('In Transit');
});
