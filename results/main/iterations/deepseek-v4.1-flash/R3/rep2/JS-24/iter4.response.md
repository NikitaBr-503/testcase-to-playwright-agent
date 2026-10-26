```ts
import { test, expect } from '@playwright/test';

test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // qa_user@example.com is registered, the user is not logged in, the basket is empty
  // and the user has no saved addresses.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('0');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Go to login page' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Step 4
  await page
    .getByRole('textbox', { name: 'Text field for the login email' })
    .fill('qa_user@example.com');

  // Step 5
  await page
    .getByRole('textbox', { name: 'Text field for the login password' })
    .fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^Log ?in$/ }).click();
  await expect(page).not.toHaveURL(/login/);

  // Step 7
  await page
    .getByRole('article')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();
  await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.getByRole('heading', { name: 'Select an address' })).toBeVisible();

  // Step 10
  await page.getByRole('button', { name: 'Add a new address' }).click();

  // Step 11
  await page.getByLabel('Country', { exact: true }).fill('Ukraine');
  await page.keyboard.press('Escape');

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
  await page.getByRole('button', { name: /^Submit$/ }).click();
  await expect(page.getByRole('heading', { name: 'Select an address' })).toBeVisible();

  // Step 19
  const savedAddressRow = page
    .getByRole('row')
    .filter({ hasText: 'QA User' })
    .filter({ hasText: 'Khreshchatyk 1' });
  await expect(savedAddressRow).toBeVisible();

  const savedAddressRadio = savedAddressRow.getByRole('radio');
  await expect(savedAddressRadio).toBeVisible();
  await savedAddressRadio.click();
  await expect(savedAddressRadio).toBeChecked();
  await expect(
    page.getByRole('button', { name: 'Proceed to payment selection' })
  ).toBeEnabled();

  // Step 20
  await page.getByRole('button', { name: 'Proceed to payment selection' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Choose a delivery speed' })).toBeVisible();

  // Expected 2
  const oneDayDelivery = page.getByRole('radio', { name: /One Day Delivery/ });
  const fastDelivery = page.getByRole('radio', { name: /Fast Delivery/ });
  const standardDelivery = page.getByRole('radio', { name: /Standard Delivery/ });

  await expect(oneDayDelivery).toBeVisible();
  await expect(oneDayDelivery).toContainText(/0\.99\s*¤/);

  await expect(fastDelivery).toBeVisible();
  await expect(fastDelivery).toContainText(/0\.50?\s*¤/);

  await expect(standardDelivery).toBeVisible();
  await expect(standardDelivery).toContainText(/0(\.0+)?\s*¤/);
});
```