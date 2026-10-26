```ts
import { test, expect } from '@playwright/test';

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
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByLabel(/email/i).fill(uniqueEmail);

  // Step 6
  await page.getByLabel('Field for the password').fill(oldPassword);

  // Step 7
  await page.getByLabel('Field to confirm the password').fill(oldPassword);

  // Step 8
  await page
    .getByRole('combobox', { name: 'Selection list for the security question' })
    .click();
  await page
    .getByRole('option', { name: 'Your eldest siblings middle name?' })
    .click();

  // Step 9
  await page.getByLabel(/answer/i).fill('Kyiv');

  // Step 10
  await page
    .getByRole('button', { name: 'Button to complete the registration' })
    .click();

  // Expected 1
  await expect(
    page.getByText('Registration completed successfully. You can now log in.')
  ).toBeVisible();

  // Step 11
  await page.getByLabel(/email/i).fill(uniqueEmail);

  // Step 12
  await page.getByLabel(/password/i).fill(oldPassword);

  // Step 13
  await page.getByRole('button', { name: /log ?in/i }).click();

  // Step 14
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 15
  await page.getByRole('menuitem', { name: 'Privacy & Security' }).click();

  // Step 16
  await page
    .getByRole('menuitem', { name: 'Change Password' })
    .or(page.getByRole('link', { name: 'Change Password' }))
    .click();

  // Step 17
  await page.getByLabel(/current password/i).fill(oldPassword);

  // Step 18
  await page.getByLabel(/new password/i).first().fill(newPassword);

  // Step 19
  await page.getByLabel(/new password/i).last().fill(newPassword);

  // Step 20
  await page.getByRole('button', { name: /change/i }).click();

  // Expected 2
  await expect(
    page.getByText('Your password was successfully changed.')
  ).toBeVisible();
});
```