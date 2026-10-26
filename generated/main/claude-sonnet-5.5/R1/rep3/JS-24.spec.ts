import { test, expect } from '../../../../../support/fixtures';
test('JS-24 Оформлення замовлення до вибору способу доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the environment; the user is not logged in,
  // the basket is empty and there are no saved addresses (fresh browser context).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

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
    .getByRole('button', { name: /add to basket/i })
    .click();

  // Step 8
  await page.getByRole('button', { name: /your basket/i }).click();

  // Step 9
  await page.getByRole('button', { name: /checkout/i }).click();

  // Step 10
  await expect(page.getByText('Select an address')).toBeVisible();
  await page.getByRole('button', { name: /add new address/i }).click();

  // Step 11
  await page.getByPlaceholder(/country/i).fill('Ukraine');

  // Step 12
  await page.getByPlaceholder(/name/i).fill('QA User');

  // Step 13
  await page.getByPlaceholder(/mobile number/i).fill('5012345678');

  // Step 14
  await page.getByPlaceholder(/zip code/i).fill('01001');

  // Step 15
  await page.getByPlaceholder(/address/i).fill('Khreshchatyk 1');

  // Step 16
  await page.getByPlaceholder(/city/i).fill('Kyiv');

  // Step 17
  await page.getByPlaceholder(/state/i).fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: /submit/i }).click();

  // Step 19
  await page.getByRole('row', { name: /QA User/ }).click();

  // Step 20
  await page
    .getByRole('button', { name: /proceed to delivery method selection|continue/i })
    .click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'Choose a delivery speed' })).toBeVisible();

  // Expected 2
  const oneDay = page.getByRole('row', { name: /One Day Delivery/ });
  const fast = page.getByRole('row', { name: /Fast Delivery/ });
  const standard = page.getByRole('row', { name: /Standard Delivery/ });

  await expect(oneDay).toBeVisible();
  await expect(oneDay).toContainText('0.99¤');
  await expect(fast).toBeVisible();
  await expect(fast).toContainText('0.50¤');
  await expect(standard).toBeVisible();
  await expect(standard).toContainText('0.00¤');
});
