```ts
import { test, expect } from '@playwright/test';

test('JS-22: Зміна пароля новим користувачем', async ({ page }) => {
  // Preconditions
  const email = `pwd_change_${Date.now()}@example.com`;

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
  await page.getByLabel('Field for the password').fill('OldPass123!');

  // Step 7
  await page.getByLabel('Field to confirm the password').fill('OldPass123!');

  // Step 8
  await page.getByRole('combobox', { name: 'Selection list for the security question' }).click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page.getByLabel('Field for the answer to the security question').fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Button to complete the registration' }).click();

  // Expected 1
  await expect(
    page.getByText('Registration completed successfully. You can now log in.')
  ).toBeVisible();

  // Step 11
  await page.getByLabel('Text field for the login email').fill(email);

  // Step 12
  await page.getByLabel('Text field for the login password').fill('OldPass123!');

  // Step 13
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 14
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 15
  await page.getByRole('menuitem', { name: 'Show Privacy and Security Menu' }).click();

  // Step 16
  await page.getByRole('menuitem', { name: /change password/i }).click();

  // Step 17
  await page.getByLabel('Text field for the current password').fill('OldPass123!');

  // Step 18
  await page.getByLabel('Text field for the new password', { exact: true }).fill('NewPass456!');

  // Step 19
  await page.getByLabel('Text field to repeat the new password').fill('NewPass456!');

  // Step 20
  await page.getByRole('button', { name: 'Button to confirm the password change' }).click();

  // Expected 2
  await expect(page.getByText('Your password was successfully changed.')).toBeVisible();
});
```