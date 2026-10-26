import { test, expect } from '../../../../../support/fixtures';
test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in, basket is empty and no saved addresses exist.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('0');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toContainText(
    'qa_user@example.com'
  );

  // Step 7
  await page
    .getByRole('article')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: /Your Basket/ }).click();
  await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.getByText('Select an address')).toBeVisible();

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
  await page.getByLabel('Address', { exact: true }).fill('Khreshchatyk 1');

  // Step 16
  await page.getByLabel('City').fill('Kyiv');

  // Step 17
  await page.getByLabel('State').fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('radio', { name: /QA User/ })).toBeVisible();

  // Step 19
  await page.getByRole('radio', { name: /QA User/ }).check();
  await expect(page.getByRole('radio', { name: /QA User/ })).toBeChecked();

  // Step 20
  await page.getByRole('button', { name: 'Continue' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Choose a delivery speed' })).toBeVisible();

  // Expected 2
  const oneDayDelivery = page.getByRole('radio', { name: /One Day Delivery/ });
  const fastDelivery = page.getByRole('radio', { name: /Fast Delivery/ });
  const standardDelivery = page.getByRole('radio', { name: /Standard Delivery/ });

  await expect(oneDayDelivery).toBeVisible();
  await expect(oneDayDelivery).toContainText('0.99¤');

  await expect(fastDelivery).toBeVisible();
  await expect(fastDelivery).toContainText('0.50¤');

  await expect(standardDelivery).toBeVisible();
  await expect(standardDelivery).toContainText('0.00¤');
});
