import { test, expect } from '../../../../../support/fixtures';
test('JS-13 Реєстрація з паролями, що не збігаються', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context is used, so no session exists.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByLabel(/email/i).fill('mismatch@example.com');

  // Step 6
  await page.getByLabel(/^password$/i).fill('Secret123!');

  // Step 7
  await page.getByLabel(/repeat password/i).fill('Secret999!');

  // Expected 1
  await expect(page.getByText('Passwords do not match')).toBeVisible();

  // Expected 2
  await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
});
