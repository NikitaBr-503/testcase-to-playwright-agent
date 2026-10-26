import { test, expect } from '../../../../../support/fixtures';
test('JS-13 Реєстрація з паролями, що не збігаються', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByText('Not yet a customer?').click();

  // Step 5
  await page.getByRole('textbox', { name: 'Email address field' }).fill('mismatch@example.com');

  // Step 6
  await page.getByRole('textbox', { name: 'Field for the password' }).fill('Secret123!');

  // Step 7
  await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill('Secret999!');
  await page.getByRole('textbox', { name: 'Field to confirm the password' }).blur();

  // Expected 1
  await expect(page.getByText('Passwords do not match')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('button', { name: 'Button for registering an account' })).toBeDisabled();
});
