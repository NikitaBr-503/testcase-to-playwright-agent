import { test, expect } from '../../../../../support/fixtures';
test('JS-13 Реєстрація з паролями, що не збігаються', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (fresh browser context, no session).

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'Not yet a customer?' })).toBeVisible();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();
  await expect(page.getByRole('heading', { name: 'User Registration' })).toBeVisible();

  // Step 5
  await page.getByRole('textbox', { name: 'Email address field' }).fill('mismatch@example.com');

  // Step 6
  await page.getByRole('textbox', { name: 'Field for the password' }).fill('Secret123!');

  // Step 7
  const repeatPassword = page.getByRole('textbox', { name: 'Field to confirm the password' });
  await repeatPassword.fill('Secret999!');
  // The mismatch validation is triggered when the field loses focus.
  await repeatPassword.blur();

  // Expected 1
  await expect(page.getByText('Passwords do not match')).toBeVisible();

  // Expected 2
  await expect(
    page.getByRole('button', { name: 'Button to complete the registration' })
  ).toBeDisabled();
});
