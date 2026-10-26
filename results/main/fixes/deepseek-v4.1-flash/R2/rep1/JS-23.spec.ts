import { test, expect } from '../../../../../support/fixtures';
test('JS-23 Реєстрація і вхід новим користувачем', async ({ page }) => {
  const email = `new_login_${Date.now()}@example.com`;
  const password = 'Login123!';

  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user is not logged in: the test runs in a fresh, unauthenticated browser context.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByLabel('Email').fill(email);

  // Step 6
  await page.getByRole('textbox', { name: 'Field for the password' }).fill(password);

  // Step 7
  await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill(password);

  // Step 8
  await page
    .getByRole('combobox', { name: 'Selection list for the security question' })
    .click();
  await expect(page.getByRole('listbox')).toBeVisible();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page.getByLabel('Answer').fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Button to complete the registration' }).click();

  // Step 11
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill(email);

  // Step 12
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill(password);

  // Step 13
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).not.toHaveURL(/login/);

  // Step 14
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: /Your Basket/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Your Basket/ })).toContainText(email);

  // Expected 2
  await expect(page.getByRole('cell')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText(
    /Your Basket\s*0/
  );
});
