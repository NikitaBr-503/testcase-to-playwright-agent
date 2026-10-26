```ts
import { test, expect } from '@playwright/test';

test('JS-25 Повне оформлення замовлення з оплатою карткою', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are dismissed by the test environment.
  // The user qa_user@example.com is registered, logged out, with an empty basket and no saved addresses or cards.

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
  await page
    .locator('mat-card')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Step 8
  await page.getByRole('button', { name: /Your Basket|shopping cart/i }).click();

  // Step 9
  await page.getByRole('button', { name: /Checkout/i }).click();

  // Step 10
  await expect(page.getByText('Select an address')).toBeVisible();
  await page.getByRole('button', { name: /add (a )?new address/i }).click();

  // Step 11
  await page.getByPlaceholder('Please provide a country.').fill('Ukraine');

  // Step 12
  await page.getByPlaceholder('Please provide a name.').fill('QA User');

  // Step 13
  await page.getByPlaceholder('Please provide a mobile number.').fill('5012345678');

  // Step 14
  await page.getByPlaceholder('Please provide a ZIP code.').fill('01001');

  // Step 15
  await page.getByPlaceholder('Please provide an address.').fill('Khreshchatyk 1');

  // Step 16
  await page.getByPlaceholder('Please provide a city.').fill('Kyiv');

  // Step 17
  await page.getByPlaceholder('Please provide a state.').fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 19
  await page.getByRole('row', { name: /QA User/ }).click();

  // Step 20
  await page.getByRole('button', { name: /Continue|Proceed/i }).click();

  // Step 21
  await page.getByRole('row', { name: /Standard Delivery/ }).click();

  // Step 22
  await page.getByRole('button', { name: /Continue|Proceed/i }).click();

  // Step 23
  await page.getByText('Add new card').click();

  // Step 24
  await page.getByRole('textbox', { name: 'Name' }).fill('QA User');

  // Step 25
  await page.getByRole('spinbutton', { name: 'Card Number' }).fill('4111111111111111');

  // Step 26
  await page.getByLabel('Expiry Month').selectOption('12');

  // Step 27
  await page.getByLabel('Expiry Year').selectOption('2090');

  // Step 28
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 29
  await page.getByRole('row', { name: /1111/ }).click();

  // Step 30
  await page.getByRole('button', { name: /Continue|Proceed/i }).click();

  // Step 31
  await page.getByRole('button', { name: /Place your order and pay/i }).click();

  // Expected 1
  await expect(page.getByText('Thank you for your purchase!')).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)').first()).toBeVisible();

  // Step 32
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 33
  await page.getByRole('menuitem', { name: /Orders (&|and) Payment/i }).click();

  // Step 34
  await page.getByRole('menuitem', { name: /Order History/i }).click();

  // Expected 3
  const firstOrder = page.locator('mat-card').first();
  await expect(firstOrder).toContainText('Apple Juice (1000ml)');
  await expect(firstOrder).toContainText('In Transit');
});
```