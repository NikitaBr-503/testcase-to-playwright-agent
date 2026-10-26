```ts
import { test, expect } from '@playwright/test';

test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered, is not logged in, the basket is empty
  // and no delivery addresses are stored for the user.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByPlaceholder('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByPlaceholder('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByPlaceholder('Password')).toBeHidden();

  // Step 7
  const appleJuiceCard = page
    .locator('article')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(page.getByRole('button', { name: /Your Basket/ })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: /Your Basket/ }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await expect(page.getByRole('heading', { name: 'Select an address' })).toBeVisible();
  await page.getByRole('button', { name: 'Add New Address' }).click();

  // Step 11
  await page.getByRole('textbox', { name: 'Country' }).fill('Ukraine');

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
  const savedAddressRow = page.getByRole('row').filter({ hasText: 'QA User' });
  await expect(savedAddressRow).toBeVisible();
  await savedAddressRow.getByRole('radio').check();

  // Step 20
  await page.getByRole('button', { name: 'Continue' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Choose a delivery speed' })).toBeVisible();

  // Expected 2
  const oneDayDelivery = page.getByRole('row').filter({ hasText: 'One Day Delivery' });
  await expect(oneDayDelivery).toBeVisible();
  await expect(oneDayDelivery).toContainText('0.99¤');

  const fastDelivery = page.getByRole('row').filter({ hasText: 'Fast Delivery' });
  await expect(fastDelivery).toBeVisible();
  await expect(fastDelivery).toContainText('0.50¤');

  const standardDelivery = page.getByRole('row').filter({ hasText: 'Standard Delivery' });
  await expect(standardDelivery).toBeVisible();
  await expect(standardDelivery).toContainText('0.00¤');
});
```