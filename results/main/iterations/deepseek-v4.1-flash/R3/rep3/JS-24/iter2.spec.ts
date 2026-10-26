import { test, expect } from '../../../../../support/fixtures';
test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered, is not logged in, has an empty basket and no saved addresses.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

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
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await expect(page.getByRole('heading', { name: 'Select an address' })).toBeVisible();
  await page.getByRole('button', { name: 'Add New Address' }).click();

  // Step 11
  await page.getByRole('textbox', { name: 'Country' }).fill('Ukraine');

  // Step 12
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('QA User');

  // Step 13
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('5012345678');

  // Step 14
  await page.getByRole('textbox', { name: 'ZIP Code' }).fill('01001');

  // Step 15
  await page.getByRole('textbox', { name: 'Address', exact: true }).fill('Khreshchatyk 1');

  // Step 16
  await page.getByRole('textbox', { name: 'City' }).fill('Kyiv');

  // Step 17
  await page.getByRole('textbox', { name: 'State' }).fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 19
  const savedAddressRow = page.getByRole('row').filter({ hasText: 'QA User' });
  await expect(savedAddressRow).toBeVisible();
  await savedAddressRow.getByRole('radio').check();

  // Step 20
  await page.getByRole('button', { name: 'Continue' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Choose a delivery speed' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('One Day Delivery', { exact: true })).toBeVisible();
  await expect(page.getByText('0.99¤', { exact: true })).toBeVisible();
  await expect(page.getByText('Fast Delivery', { exact: true })).toBeVisible();
  await expect(page.getByText('0.50¤', { exact: true })).toBeVisible();
  await expect(page.getByText('Standard Delivery', { exact: true })).toBeVisible();
  await expect(page.getByText('0.00¤', { exact: true })).toBeVisible();
});
