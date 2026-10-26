```ts
import { test, expect } from '@playwright/test';

test('JS-23 Реєстрація і вхід новим користувачем', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.
  const email = `new_login_${Date.now()}@example.com`;
  const password = 'Login123!';

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /Account|account menu/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByLabel(/^Email/).fill(email);

  // Step 6
  await page.getByLabel(/^Password/).fill(password);

  // Step 7
  await page.getByLabel(/^Repeat Password/).fill(password);

  // Step 8
  await page.getByRole('combobox', { name: /Security Question/ }).click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page.getByLabel(/^Answer/).fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: /Register|registration/i }).click();

  // Step 11
  await expect(page).toHaveURL(/\/login/);
  await page.getByLabel(/^Email/).fill(email);

  // Step 12
  await page.getByLabel(/^Password/).fill(password);

  // Step 13
  await page.getByRole('button', { name: /^(Log in|Login)$/ }).click();

  // Step 14
  await page.getByRole('button', { name: /Your Basket/ }).click();

  // Expected 1
  await expect(
    page.getByRole('heading', { name: `Your Basket (${email})` })
  ).toBeVisible();

  // Expected 2
  await expect(page.locator('app-purchase-basket mat-row')).toHaveCount(0);
});
```