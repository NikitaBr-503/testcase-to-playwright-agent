```ts
import { test, expect } from '@playwright/test';

test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered, not logged in, has an empty basket and no saved addresses.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

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
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await expect(page.getByRole('heading', { name: 'Select an address' })).toBeVisible();
  await page.getByRole('button', { name: 'Add a new address' }).click();

  // Step 11
  await page.getByRole('textbox', { name: 'Country', exact: true }).fill('Ukraine');

  // Step 12
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('QA User');

  // Step 13
  await page.getByRole('spinbutton', { name: 'Mobile Number' }).fill('5012345678');

  // Step 14
  await page.getByRole('textbox', { name: 'ZIP Code' }).fill('01001');

  // Step 15
  await page.getByRole('textbox', { name: 'Address', exact: true }).fill('Khreshchatyk 1');

  // Step 16
  await page.getByRole('textbox', { name: 'City', exact: true }).fill('Kyiv');

  // Step 17
  await page.getByRole('textbox', { name: 'State', exact: true }).fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 19
  const savedAddressRow = page.getByRole('row').filter({ hasText: 'Khreshchatyk 1' });
  await expect(savedAddressRow).toBeVisible();
  await expect(savedAddressRow).toContainText('QA User');
  await savedAddressRow.getByRole('radio').check();

  // Step 20
  await page.getByRole('button', { name: 'Proceed to payment selection' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Choose a delivery speed' })).toBeVisible();

  // Expected 2
  const oneDayDeliveryRow = page.getByRole('row').filter({ hasText: 'One Day Delivery' });
  await expect(oneDayDeliveryRow).toBeVisible();
  await expect(oneDayDeliveryRow.getByRole('radio')).toBeVisible();
  await expect(oneDayDeliveryRow).toContainText('0.99¤');

  const fastDeliveryRow = page.getByRole('row').filter({ hasText: 'Fast Delivery' });
  await expect(fastDeliveryRow).toBeVisible();
  await expect(fastDeliveryRow.getByRole('radio')).toBeVisible();
  await expect(fastDeliveryRow).toContainText('0.50¤');

  const standardDeliveryRow = page.getByRole('row').filter({ hasText: 'Standard Delivery' });
  await expect(standardDeliveryRow).toBeVisible();
  await expect(standardDeliveryRow.getByRole('radio')).toBeVisible();
  await expect(standardDeliveryRow).toContainText('0.00¤');
});
```