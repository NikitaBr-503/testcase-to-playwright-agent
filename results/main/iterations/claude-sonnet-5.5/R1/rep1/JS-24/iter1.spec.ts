import { test, expect } from '../../../../../support/fixtures';
test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the environment; user is registered,
  // not logged in, the basket is empty and there are no saved addresses (fresh browser context).
  await page.context().clearCookies();

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByLabel(/email/i).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^log ?in$/i }).click();

  // Step 7
  const appleJuiceCard = page.locator('mat-card').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceCard).toBeVisible();
  await appleJuiceCard.getByRole('button', { name: /add to basket/i }).click();

  // Step 8
  await page.getByRole('button', { name: /Your Basket|Show the shopping cart/i }).click();

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
  await page.getByRole('button', { name: /continue|proceed/i }).click();

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
