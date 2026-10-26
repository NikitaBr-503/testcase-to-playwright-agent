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
  await page.getByRole('menuitem', { name: 'Go to login page' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout', exact: true }).click();

  // Step 10
  await page.getByRole('button', { name: 'Add a new address' }).click();

  // Step 11
  const countryField = page.getByLabel('Country', { exact: true });
  const countryTagName = await countryField.evaluate((el) => el.tagName.toLowerCase());
  if (countryTagName === 'select') {
    await countryField.selectOption('Ukraine');
  } else if (countryTagName === 'input') {
    await countryField.fill('Ukraine');
  } else {
    await countryField.click();
    await page.getByRole('option', { name: 'Ukraine', exact: true }).click();
  }

  // Step 12
  await page.getByLabel('Name').fill('QA User');

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
  await page.getByRole('button').filter({ hasText: 'Submit' }).click();

  // Step 19
  await page.getByRole('row', { name: /QA User/ }).getByRole('radio').click();

  // Step 20
  await page.getByRole('button', { name: 'Proceed to payment selection' }).click();

  // Step 21
  await page.getByRole('row').filter({ hasText: 'Standard Delivery' }).getByRole('radio').check();

  // Step 22
  await page.getByRole('button', { name: 'Proceed to delivery method selection' }).click();

  // Step 23
  await page.getByText('Add new card').click();

  // Step 24
  await page.getByLabel('Name').fill('QA User');

  // Step 25
  await page.getByLabel('Card Number', { exact: true }).fill('4111111111111111');

  // Step 26
  await page.getByLabel('Expiry Month').selectOption('12');

  // Step 27
  await page.getByLabel('Expiry Year').selectOption('2090');

  // Step 28
  await page.getByRole('button').filter({ hasText: 'Submit' }).click();

  // Step 29
  await page.getByRole('row').filter({ hasText: '1111' }).getByRole('radio').check();

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
  await expect(newestOrder).toContainText('In Transit');
  await expect(newestOrder).toContainText('Apple Juice (1000ml)');
});
