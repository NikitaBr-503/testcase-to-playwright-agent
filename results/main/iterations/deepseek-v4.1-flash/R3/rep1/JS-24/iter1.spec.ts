import { test, expect } from '../../../../../support/fixtures';
test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered, is not logged in, has an empty basket
  // and no saved addresses.
  await page.goto('/');

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page
    .locator('article')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await expect(page.getByText('Select an address')).toBeVisible();
  await page.getByRole('button', { name: 'Add New Address' }).click();

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
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 19
  await page.getByRole('radio', { name: /QA User/ }).click();

  // Step 20
  await page.getByRole('button', { name: 'Continue' }).click();

  // Expected 1
  await expect(page.getByText('Choose a delivery speed')).toBeVisible();

  // Expected 2
  await expect(page.getByText('One Day Delivery')).toBeVisible();
  await expect(page.getByText('0.99¤')).toBeVisible();
  await expect(page.getByText('Fast Delivery')).toBeVisible();
  await expect(page.getByText('0.50¤')).toBeVisible();
  await expect(page.getByText('Standard Delivery')).toBeVisible();
  await expect(page.getByText('0.00¤')).toBeVisible();
});
