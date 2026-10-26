```ts
import { test, expect } from '@playwright/test';

test('JS-25 Повне оформлення замовлення з оплатою карткою', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment;
  // fresh browser context: user is not logged in, basket is empty, no saved addresses or cards.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 7
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();
  const appleJuiceCard = page
    .getByRole('article')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  await page.getByRole('button', { name: /checkout/i }).click();

  // Step 10
  await expect(page.getByText('Select an address')).toBeVisible();
  await page.getByRole('button', { name: /add (a )?new address/i }).click();

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
  const addressRow = page.getByRole('row').filter({ hasText: 'QA User' });
  await expect(addressRow).toBeVisible();
  await addressRow.click();

  // Step 20
  await page.getByRole('button', { name: /continue|proceed to/i }).click();

  // Step 21
  const deliveryRow = page.getByRole('row').filter({ hasText: 'Standard Delivery' });
  await expect(deliveryRow).toBeVisible();
  await deliveryRow.click();

  // Step 22
  await page.getByRole('button', { name: /continue|proceed to/i }).click();

  // Step 23
  await page.getByText('Add new card').click();

  // Step 24
  await page.getByLabel('Name').fill('QA User');

  // Step 25
  await page.getByLabel('Card Number').fill('4111111111111111');

  // Step 26
  await page.getByLabel('Expiry Month').selectOption('12');

  // Step 27
  await page.getByLabel('Expiry Year').selectOption('2090');

  // Step 28
  await page.getByRole('button', { name: /submit/i }).click();

  // Step 29
  const cardRow = page.getByRole('row').filter({ hasText: '1111' });
  await expect(cardRow).toBeVisible();
  const cardRadio = cardRow.getByRole('radio');
  await cardRadio.check();
  await expect(cardRadio).toBeChecked();

  // Step 30
  const continueButton = page.getByRole('button', { name: /continue|proceed to/i });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  // Step 31
  await page
    .getByRole('button', { name: /place your order and pay|complete your purchase/i })
    .click();

  // Expected 1
  await expect(page.getByText('Thank you for your purchase!')).toBeVisible();

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)').first()).toBeVisible();

  // Step 32
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 33
  await page.getByRole('menuitem', { name: /Orders & Payment/i }).click();

  // Step 34
  await page.getByRole('menuitem', { name: /order history/i }).click();

  // Expected 3
  const firstOrder = page
    .locator('mat-card')
    .filter({ hasText: 'Apple Juice (1000ml)' })
    .first();
  await expect(firstOrder).toBeVisible();
  await expect(firstOrder).toContainText('Apple Juice (1000ml)');
  await expect(firstOrder).toContainText('In Transit');
});
```