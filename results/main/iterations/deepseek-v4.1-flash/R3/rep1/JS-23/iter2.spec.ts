import { test, expect } from '../../../../../support/fixtures';
test('JS-23 Реєстрація і вхід новим користувачем', async ({ page }) => {
  const email = `new_login_${Date.now()}@example.com`;
  const password = 'Login123!';

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: the test runs in a fresh browser context.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByRole('textbox', { name: 'Email address field' }).fill(email);

  // Step 6
  await page.getByRole('textbox', { name: 'Field for the password' }).fill(password);

  // Step 7
  await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill(password);

  // Step 8
  await page.getByRole('combobox', { name: 'Selection list for the security question' }).click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page
    .getByRole('textbox', { name: 'Field for the answer to the security question' })
    .fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Button to complete the registration' }).click();

  // Step 11
  await expect(page).toHaveURL(/\/login/);
  await page.getByRole('textbox', { name: 'Email address field' }).fill(email);

  // Step 12
  await page.getByRole('textbox', { name: 'Field for the password' }).fill(password);

  // Step 13
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 14
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 1
  await expect(page).toHaveURL(/\/basket/);
  await expect(page.getByRole('heading', { name: /Your Basket/ })).toBeVisible();
  await expect(page.getByText(email)).toBeVisible();

  // Expected 2
  await expect(page.locator('mat-row')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText(
    'Your Basket 0'
  );
});
