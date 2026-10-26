```ts
import { test, expect } from '@playwright/test';

test('JS-22 Зміна пароля новим користувачем', async ({ page }) => {
  const email = `pwd_change_${Date.now()}@example.com`;
  const oldPassword = 'OldPass123!';
  const newPassword = 'NewPass456!';

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context has no authenticated session.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByRole('textbox', { name: /email/i }).fill(email);

  // Step 6
  await page.getByLabel('Field for the password').fill(oldPassword);

  // Step 7
  await page.getByLabel('Field to confirm the password').fill(oldPassword);

  // Step 8
  await page.getByRole('combobox', { name: /security question/i }).click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page.getByRole('textbox', { name: /answer/i }).fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: /regist/i }).click();

  // Expected 1
  await expect(
    page.getByText('Registration completed successfully. You can now log in.')
  ).toBeVisible();

  // Step 11
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill(email);

  // Step 12
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill(oldPassword);

  // Step 13
  await page.getByRole('button', { name: /^log ?in$/i }).click();

  // Step 14
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 15
  await page.getByRole('menuitem', { name: /privacy and security/i }).click();

  // Step 16
  await page.getByRole('menuitem', { name: /change password/i }).click();

  // Step 17
  await page
    .getByRole('textbox', { name: 'Field to enter the current password' })
    .fill(oldPassword);

  // Step 18
  await page
    .getByRole('textbox', { name: 'Field for the new password' })
    .fill(newPassword);

  // Step 19
  await page
    .getByRole('textbox', { name: 'Field to repeat the new password' })
    .fill(newPassword);

  // Step 20
  await page.getByRole('button', { name: 'Button to confirm the change' }).click();

  // Expected 2
  await expect(page.getByText('Your password was successfully changed.')).toBeVisible();
});
```