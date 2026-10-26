import { test, expect } from '../../../../../support/fixtures';
test('JS-22 Зміна пароля новим користувачем', async ({ page }) => {
  const uniqueEmail = `pwd_change_${Date.now()}@example.com`;
  const oldPassword = 'OldPass123!';
  const newPassword = 'NewPass456!';

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (fresh browser context).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByLabel('Email').fill(uniqueEmail);

  // Step 6
  await page.getByLabel('Password', { exact: true }).fill(oldPassword);

  // Step 7
  await page.getByLabel('Repeat Password').fill(oldPassword);

  // Step 8
  await page
    .getByLabel('Security Question')
    .selectOption('Your eldest siblings middle name?');

  // Step 9
  await page.getByLabel('Answer').fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Register' }).click();

  // Expected 1
  await expect(
    page.getByText('Registration completed successfully. You can now log in.')
  ).toBeVisible();

  // Step 11
  await page.getByLabel('Email').fill(uniqueEmail);

  // Step 12
  await page.getByLabel('Password', { exact: true }).fill(oldPassword);

  // Step 13
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 14
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 15
  await page.getByRole('menuitem', { name: 'Privacy & Security' }).click();

  // Step 16
  await page.getByRole('menuitem', { name: 'Change Password' }).click();

  // Step 17
  await page.getByLabel('Current Password').fill(oldPassword);

  // Step 18
  await page.getByLabel('New Password', { exact: true }).fill(newPassword);

  // Step 19
  await page.getByLabel('Repeat New Password').fill(newPassword);

  // Step 20
  await page.getByRole('button', { name: 'Change' }).click();

  // Expected 2
  await expect(
    page.getByText('Your password was successfully changed.')
  ).toBeVisible();
});
