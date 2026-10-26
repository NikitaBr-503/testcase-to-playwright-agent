import { test, expect } from '../../../../../support/fixtures';
test('JS-23 Реєстрація і вхід новим користувачем', async ({ page }) => {
  const email = `new_login_${Date.now()}@example.com`;
  const password = 'Login123!';

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (fresh browser context, no session).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

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
  await page.getByLabel('Security Question').click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page.getByLabel('Answer', { exact: true }).fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Register' }).click();

  // Step 11
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
  await page.getByLabel('Email', { exact: true }).fill(email);

  // Step 12
  await page.getByLabel('Password', { exact: true }).fill(password);

  // Step 13
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Log in' })).toBeHidden();

  // Step 14
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: `Your Basket (${email})` })).toBeVisible();

  // Expected 2
  await expect(page.locator('tr[mat-row]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toHaveText(/Your Basket\s*0/);
});
