import { test, expect } from '../../../../../support/fixtures';
test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // qa_user@example.com is registered, not logged in, has an empty basket and no saved addresses.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Step 4
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();

  // Step 7
  await page
    .locator('article')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();
  await expect(page.getByText('Apple Juice (1000ml)')).toBeVisible();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await expect(page.getByRole('heading', { name: 'Select an address' })).toBeVisible();
  await page.getByRole('button', { name: 'Add a new address' }).click();

  // Step 11
  await page.getByRole('textbox', { name: 'Country' }).fill('Ukraine');

  // Step 12
  await page.getByRole('textbox', { name: 'Name' }).fill('QA User');

  // Step 13
  await page.getByRole('spinbutton', { name: 'Mobile Number' }).fill('5012345678');

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
  await expect(page.getByRole('heading', { name: 'Select an address' })).toBeVisible();

  // Step 19
  const savedAddress = page.getByRole('cell', { name: 'QA User' });
  await expect(savedAddress).toBeVisible();
  await savedAddress.click();
  await expect(page.locator('.mat-mdc-radio-touch-target')).toBeChecked();

  // Step 20
  await page.getByRole('button', { name: /Proceed to payment selection/ }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Choose a delivery speed' })).toBeVisible();

  // Expected 2
  await expect(page.getByRole('cell', { name: 'One Day Delivery' })).toBeVisible();
  await expect(page.getByText('0.99¤')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Fast Delivery' })).toBeVisible();
  await expect(page.getByText('0.50¤')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Standard Delivery' })).toBeVisible();
  await expect(page.getByText('0.00¤')).toBeVisible();
});
