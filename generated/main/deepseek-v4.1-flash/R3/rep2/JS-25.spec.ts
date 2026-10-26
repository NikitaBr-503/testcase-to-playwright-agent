import { test, expect } from '../../../../../support/fixtures';
test('JS-25 Повне оформлення замовлення з оплатою карткою', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the test environment.
  // User qa_user@example.com is registered, is not logged in, basket is empty,
  // and the user has no saved addresses or cards.

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
  await page.getByRole('textbox', { name: 'Password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: /Your Basket/ }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  // With an empty address book the app may land directly on the address form;
  // otherwise the "Select an address" page is shown and "Add New Address" is clicked.
  const addNewAddressButton = page.getByRole('button', { name: 'Add New Address' });
  const countryField = page.getByRole('textbox', { name: 'Country' });
  await expect(addNewAddressButton.or(countryField).first()).toBeVisible();
  if (await addNewAddressButton.isVisible()) {
    await addNewAddressButton.click();
  }

  // Step 11
  await countryField.fill('Ukraine');

  // Step 12
  await page.getByRole('textbox', { name: 'Name' }).fill('QA User');

  // Step 13
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('5012345678');

  // Step 14
  await page.getByRole('textbox', { name: 'ZIP Code' }).fill('01001');

  // Step 15
  await page.getByRole('textbox', { name: 'Address' }).fill('Khreshchatyk 1');

  // Step 16
  await page.getByRole('textbox', { name: 'City' }).fill('Kyiv');

  // Step 17
  await page.getByRole('textbox', { name: 'State' }).fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 19
  await page.getByRole('radio', { name: /QA User/ }).click();

  // Step 20
  await page.getByRole('button', { name: 'Continue' }).click();

  // Step 21
  await page.getByRole('radio', { name: /Standard Delivery/ }).click();

  // Step 22
  await page.getByRole('button', { name: 'Continue' }).click();

  // Step 23
  await page.getByRole('button', { name: 'Add new card' }).click();

  // Step 24
  await page.getByRole('textbox', { name: 'Name' }).fill('QA User');

  // Step 25
  await page.getByRole('textbox', { name: 'Card Number' }).fill('4111111111111111');

  // Step 26
  await page.getByRole('combobox', { name: 'Expiry Month' }).click();
  await page.getByRole('option', { name: '12', exact: true }).click();

  // Step 27
  await page.getByRole('combobox', { name: 'Expiry Year' }).click();
  await page.getByRole('option', { name: '2090', exact: true }).click();

  // Step 28
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 29
  await page.getByRole('radio', { name: /1111/ }).click();

  // Step 30
  await page.getByRole('button', { name: 'Continue' }).click();

  // Step 31
  await page.getByRole('button', { name: 'Place your order and pay' }).click();

  // Expected 1
  await expect(page.getByText('Thank you for your purchase!')).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)').first()).toBeVisible();

  // Step 32
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 33
  await page.getByRole('menuitem', { name: 'Orders & Payment' }).click();

  // Step 34
  await page.getByRole('menuitem', { name: 'Order History' }).click();

  // Expected 3
  const orderHistoryTable = page.locator('table').first();
  const firstOrderRow = orderHistoryTable.getByRole('row').nth(1);
  await expect(firstOrderRow).toContainText('In Transit');
  await firstOrderRow.getByRole('button').first().click();
  await expect(orderHistoryTable).toContainText('Apple Juice (1000ml)');
});
