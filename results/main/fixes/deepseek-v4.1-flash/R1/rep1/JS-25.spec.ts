import { test, expect } from '../../../../../support/fixtures';
test('JS-25 Повне оформлення замовлення з оплатою карткою', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered, is not logged in, has an empty basket
  // and no saved addresses or payment cards.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 7
  const appleJuiceCard = page.locator('mat-card').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: /Your Basket|shopping cart/i }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await expect(page.getByText('Select an address')).toBeVisible();
  await page.getByRole('button', { name: 'Add a new address' }).click();

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
  const savedAddress = page.getByRole('row', { name: /QA User/ }).getByRole('radio');
  await expect(savedAddress).toBeVisible();
  await savedAddress.click();

  // Step 20
  await page.getByRole('button', { name: 'Proceed to payment selection' }).click();

  // Step 21
  const standardDelivery = page.getByRole('row').filter({ hasText: 'Standard Delivery' }).getByRole('radio');
  await expect(standardDelivery).toBeVisible();
  await standardDelivery.check();

  // Step 22
  await page.getByRole('button', { name: 'Proceed to delivery method selection' }).click();

  // Step 23
  const addCardPanel = page.locator('mat-expansion-panel').filter({ hasText: 'Add new card' });
  await addCardPanel.getByText('Add new card').click();

  // Step 24
  await addCardPanel.getByLabel('Name').fill('QA User');

  // Step 25
  await addCardPanel.getByLabel('Card Number').fill('4111111111111111');

  // Step 26
  await addCardPanel.getByLabel('Expiry Month').selectOption('12');

  // Step 27
  await addCardPanel.getByLabel('Expiry Year').selectOption('2090');

  // Step 28
  await addCardPanel.getByRole('button', { name: 'Submit' }).click();

  // Step 29
  const savedCard = page.getByRole('row').filter({ hasText: '1111' }).getByRole('radio');
  await expect(savedCard).toBeVisible();
  await savedCard.check();

  // Step 30
  await page.getByRole('button', { name: 'Proceed to review' }).click();

  // Step 31
  await page.getByRole('button', { name: 'Complete your purchase' }).click();

  // Expected 1
  await expect(page.getByText('Thank you for your purchase!')).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)').first()).toBeVisible();

  // Step 32
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 33
  await page.getByRole('menuitem', { name: 'Show Orders and Payment Menu' }).click();

  // Step 34
  await page.getByRole('menuitem', { name: 'Go to order history page' }).click();

  // Expected 3
  const newestOrder = page.locator('.orders-container > div').first();
  await expect(newestOrder).toBeVisible();
  await expect(newestOrder).toContainText('Apple Juice (1000ml)');
  await expect(newestOrder).toContainText('In Transit');
});
