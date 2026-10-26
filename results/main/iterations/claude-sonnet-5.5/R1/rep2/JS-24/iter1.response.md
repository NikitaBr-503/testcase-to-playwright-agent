```ts
import { test, expect } from '@playwright/test';

test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the environment; user is not logged in.
  await page.context().clearCookies();

  // Step 1
  await page.goto('/');

  // Step 2
  await page.locator('#navbarAccount').click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.locator('#email').fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.locator('#loginButton').click();

  // Step 7
  await page
    .locator('mat-card')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Step 10
  await page.getByRole('button', { name: 'Add New Address' }).click();

  // Step 11
  await page.getByPlaceholder('Please provide a country.').fill('Ukraine');

  // Step 12
  await page.getByPlaceholder('Please provide a name.').fill('QA User');

  // Step 13
  await page.getByPlaceholder('Please provide a mobile number.').fill('5012345678');

  // Step 14
  await page.getByPlaceholder('Please provide a ZIP code.').fill('01001');

  // Step 15
  await page.getByPlaceholder('Please provide an address.').fill('Khreshchatyk 1');

  // Step 16
  await page.getByPlaceholder('Please provide a city.').fill('Kyiv');

  // Step 17
  await page.getByPlaceholder('Please provide a state.').fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: /submit/i }).click();

  // Step 19
  await page.getByRole('row').filter({ hasText: 'QA User' }).click();

  // Step 20
  await page.getByRole('button', { name: /Continue|Proceed/i }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Choose a delivery speed' })).toBeVisible();

  // Expected 2
  const oneDay = page.getByRole('row').filter({ hasText: 'One Day Delivery' });
  const fast = page.getByRole('row').filter({ hasText: 'Fast Delivery' });
  const standard = page.getByRole('row').filter({ hasText: 'Standard Delivery' });

  await expect(oneDay).toBeVisible();
  await expect(oneDay).toContainText('0.99¤');
  await expect(fast).toBeVisible();
  await expect(fast).toContainText('0.50¤');
  await expect(standard).toBeVisible();
  await expect(standard).toContainText('0.00¤');
});
```