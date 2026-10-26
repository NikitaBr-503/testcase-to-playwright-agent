import { test, expect } from '../../../../../support/fixtures';
test('JS-22 Зміна пароля новим користувачем', async ({ page }) => {
  const email = `pwd_change_${Date.now()}@example.com`;

  // Preconditions
  await page.goto('/');

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByText('Not yet a customer?').click();

  // Step 5
  await page.getByRole('textbox', { name: 'Email address field' }).fill(email);

  // Step 6
  await page.getByText('Password', { exact: true }).fill('OldPass123!');

  // Step 7
  await page.getByText('Repeat Password').fill('OldPass123!');

  // Step 8
  await page.getByText('Security Question').click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page.getByPlaceholder('Answer to your security question').fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Button to complete the' }).click();

  // Expected 1
  await expect(page.getByText('Registration completed successfully. You can now log in.')).toBeVisible();

  // Step 11
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill(email);

  // Step 12
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('OldPass123!');

  // Step 13
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 14
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 15
  await page.getByRole('menuitem', { name: 'Show Privacy and Security Menu' }).click();

  // Step 16
  await page.getByRole('menuitem', { name: 'Go to change password page' }).click();

  // Step 17
  await page.getByText('Current Password').fill('OldPass123!');

  // Step 18
  await page.getByRole('textbox', { name: 'Field for the new password' }).fill('NewPass456!');

  // Step 19
  await page.getByText('Repeat New Password').fill('NewPass456!');

  // Step 20
  await page.getByRole('button', { name: 'Change' }).click();

  // Expected 2
  await expect(page.getByText('Your password was successfully changed.')).toBeVisible();
});
