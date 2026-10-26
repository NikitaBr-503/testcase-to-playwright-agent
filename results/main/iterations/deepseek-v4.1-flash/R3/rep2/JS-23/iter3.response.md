```ts
import { test, expect } from '@playwright/test';

test('JS-23 Реєстрація і вхід новим користувачем', async ({ page }) => {
  const email = `new_login_${Date.now()}@example.com`;
  const password = 'Login123!';

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // A fresh browser context is used, so the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await expect(page.getByRole('heading', { name: 'User Registration' })).toBeVisible();
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
  const loginEmailField = page.getByRole('textbox', { name: 'Text field for the login email' });
  await expect(loginEmailField).toBeVisible();
  await loginEmailField.fill(email);

  // Step 12
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill(password);

  // Step 13
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  await expect(loginButton).toBeEnabled();
  await loginButton.click();
  await expect(loginButton).toBeHidden();

  // Step 14
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 1
  const basketHeading = page.getByRole('heading', { name: /Your Basket/ });
  await expect(basketHeading).toBeVisible();
  await expect(basketHeading).toContainText(email);

  // Expected 2
  await expect(page.getByText(/your basket is empty/i)).toBeVisible();
});
```