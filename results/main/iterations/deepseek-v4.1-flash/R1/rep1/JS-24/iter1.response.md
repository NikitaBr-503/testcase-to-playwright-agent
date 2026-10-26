```ts
import { test, expect } from '@playwright/test';

test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered, is not logged in, has an empty basket and no saved addresses.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page
    .getByRole('article')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Step 8
  await page.getByRole('button', { name: 'Your Basket' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await expect(page.getByRole('heading', { name: 'Select an address' })).toBeVisible();
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
  await page.getByLabel('Address').fill('Khreshchatyk 1');

  // Step 16
  await page.getByLabel('City').fill('Kyiv');

  // Step 17
  await page.getByLabel('State').fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 19
  await page.getByRole('button', { name: 'QA User' }).click();

  // Step 20
  await page.getByRole('button', { name: 'Continue' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Choose a delivery speed' })).toBeVisible();

  // Expected 2
  const oneDay = page.getByRole('row').filter({ hasText: 'One Day Delivery' });
  await expect(oneDay).toContainText('0.99¤');

  const fast = page.getByRole('row').filter({ hasText: 'Fast Delivery' });
  await expect(fast).toContainText('0.50¤');

  const standard = page.getByRole('row').filter({ hasText: 'Standard Delivery' });
  await expect(standard).toContainText('0.00¤');

  await expect(page.getByRole('row')).toHaveCount(4); // header row + three delivery options
});
```