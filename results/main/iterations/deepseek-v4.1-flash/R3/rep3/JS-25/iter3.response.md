```ts
import { test, expect } from '@playwright/test';

test('JS-25 Повне оформлення замовлення з оплатою карткою', async ({ page }) => {
  // Preconditions
  // - Welcome dialog and cookie banner are already dismissed by the test environment
  // - User qa_user@example.com is registered
  // - User is not logged in
  // - Basket is empty
  // - User has no saved addresses and no saved cards

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^log ?in$/i }).click();
  // Verify the login actually succeeded: the account menu now offers "Logout"
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeHidden();

  // Step 7
  await page
    .getByRole('article')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await page.getByRole('button', { name: 'Add New Address' }).click();

  // Step 11
  await page.getByLabel('Country').fill('Ukraine');

  // Step 12
  await page.getByLabel('Name').fill('QA User');

  // Step 13
  await page.getByLabel('Mobile Number').fill('5012345678');

  // Step 14
  await page.getByLabel('ZIP Code').fill('01001');

  // Step 15
  await page.getByLabel('Address').fill('Khreshchatyk 1');

  // Step 16
  await page.getByLabel('City').fill('Kyiv');

  // Step 17
  await page.getByLabel('State').fill('Kyiv');

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
  const addNewCardHeader = page.getByRole('button', { name: /Add new card/i });
  if ((await addNewCardHeader.getAttribute('aria-expanded')) !== 'true') {
    await addNewCardHeader.click();
  }
  await expect(page.getByLabel('Card Number')).toBeVisible();

  // Step 24
  await page.getByLabel('Name').fill('QA User');

  // Step 25
  await page.getByLabel('Card Number').fill('4111111111111111');

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
  await expect(page.getByText('Apple Juice (1000ml)')).toBeVisible();

  // Step 32
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 33
  await page.getByRole('menuitem', { name: 'Orders & Payment' }).click();

  // Step 34
  await page.getByRole('menuitem', { name: 'Order History' }).click();

  // Expected 3
  const orderHistoryTable = page.getByRole('table');
  const newestOrderRow = orderHistoryTable.getByRole('row').nth(1);
  await expect(newestOrderRow).toContainText('In Transit');
  await newestOrderRow.click();
  await expect(orderHistoryTable.getByText('Apple Juice (1000ml)')).toBeVisible();
});
```