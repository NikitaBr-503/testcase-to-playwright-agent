```ts
import { test, expect } from '@playwright/test';

test('JS-23 Реєстрація і вхід новим користувачем', async ({ page }) => {
  const email = `new_login_${Date.now()}@example.com`;
  const password = 'Login123!';

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The test starts in a fresh browser context, so the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByLabel('Email', { exact: true }).fill(email);

  // Step 6
  await page.getByLabel('Password', { exact: true }).fill(password);

  // Step 7
  await page.getByLabel('Repeat Password', { exact: true }).fill(password);

  // Step 8
  await page.getByRole('combobox', { name: 'Security Question' }).click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page.getByLabel('Answer', { exact: true }).fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Register', exact: true }).click();

  // Step 11
  await page.goto('/#/login');
  await page.getByLabel('Email', { exact: true }).fill(email);

  // Step 12
  await page.getByLabel('Password', { exact: true }).fill(password);

  // Step 13
  await page.getByRole('button', { name: /log ?in/i }).click();

  // Step 14
  await page.getByRole('button', { name: /Your Basket/ }).click();

  // Expected 1
  const basketHeading = page.getByRole('heading', { name: /Your Basket/ });
  await expect(basketHeading).toBeVisible();
  await expect(basketHeading).toContainText(email);

  // Expected 2
  await expect(page.locator('mat-table mat-row')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Your Basket/ })).toContainText('0');
});
```