```ts
import { test, expect } from '@playwright/test';

test('JS-23 Реєстрація і вхід новим користувачем', async ({ page }) => {
  const email = `new_login_${Date.now()}@example.com`;
  const password = 'Login123!';

  // Preconditions
  await page.context().clearCookies();

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByLabel('Email address field').fill(email);

  // Step 6
  await page.getByLabel('Field for the password', { exact: true }).fill(password);

  // Step 7
  await page.getByLabel('Field to confirm the password').fill(password);

  // Step 8
  await page.getByRole('combobox', { name: 'Selection list for the security question' }).click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page.getByLabel('Field for the answer to the security question').fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Button to complete the registration' }).click();

  // Step 11
  await expect(page).toHaveURL(/\/login/);
  await page.getByLabel('Text field for the login email').fill(email);

  // Step 12
  await page.getByLabel('Text field for the login password').fill(password);

  // Step 13
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 14
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: `Your Basket (${email})` })).toBeVisible();

  // Expected 2
  await expect(page.locator('mat-row, .mat-mdc-row')).toHaveCount(0);
  await expect(page.getByText('Total Price:')).toContainText('0¤');
});
```