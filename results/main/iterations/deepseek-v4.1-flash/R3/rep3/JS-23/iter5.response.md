```ts
import { test, expect } from '@playwright/test';

test('JS-23 Реєстрація і вхід новим користувачем', async ({ page }) => {
  const email = `new_login_${Date.now()}@example.com`;
  const password = 'Login123!';

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context is used for this test.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu', exact: true }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login', exact: true }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByLabel('Email').fill(email);

  // Step 6
  await page.getByLabel('Password', { exact: true }).fill(password);

  // Step 7
  await page.getByLabel('Repeat Password').fill(password);

  // Step 8
  await page.getByLabel('Security Question').click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page.getByLabel('Answer').fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Register', exact: true }).click();

  // Step 11
  await expect(page.getByRole('button', { name: 'Log in', exact: true })).toBeVisible();
  await page.getByLabel('Email').fill(email);

  // Step 12
  await page.getByLabel('Password', { exact: true }).fill(password);

  // Step 13
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  // Step 14
  await page.getByRole('button', { name: 'Show the shopping cart', exact: true }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: /Your Basket/ })).toBeVisible();
  await expect(page.getByText(`(${email})`).first()).toBeVisible();

  // Expected 2
  await expect(page.getByRole('button', { name: 'Show the shopping cart', exact: true })).toContainText(
    /Your Basket\s*0/
  );
  await expect(page.locator('table tbody tr')).toHaveCount(0);
});
```