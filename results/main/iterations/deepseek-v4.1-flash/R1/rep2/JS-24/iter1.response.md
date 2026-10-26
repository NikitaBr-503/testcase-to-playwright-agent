```ts
import { test, expect } from '@playwright/test';

test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions: the welcome dialog and the cookie banner are already dismissed by the test
  // environment, qa_user@example.com is registered, the user is not logged in, the basket is
  // empty and no addresses are saved for the user.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByLabel('Email', { exact: true }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  // Step 7
  const productCard = page
    .locator('mat-card, .product')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .first();
  await expect(productCard).toBeVisible();
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: /your basket|shopping cart/i }).click();

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
  const savedAddress = page.getByRole('row').filter({ hasText: 'QA User' }).first();
  await expect(savedAddress).toBeVisible();
  await savedAddress.getByRole('radio').check();

  // Step 20
  await page.getByRole('button', { name: 'Continue' }).click();

  // Expected 1
  await expect(page.getByText('Choose a delivery speed')).toBeVisible();
  await expect(page.getByText('Choose a delivery speed')).toContainText('Choose a delivery speed');

  // Expected 2
  const deliveryMethod = (name: string) =>
    page.locator('mat-card, mat-radio-button').filter({ hasText: name }).first();

  const oneDayDelivery = deliveryMethod('One Day Delivery');
  await expect(oneDayDelivery).toBeVisible();
  await expect(oneDayDelivery).toContainText(/0\.99\s?¤/);

  const fastDelivery = deliveryMethod('Fast Delivery');
  await expect(fastDelivery).toBeVisible();
  await expect(fastDelivery).toContainText(/0\.50\s?¤/);

  const standardDelivery = deliveryMethod('Standard Delivery');
  await expect(standardDelivery).toBeVisible();
  await expect(standardDelivery).toContainText(/0\.00\s?¤/);
});
```