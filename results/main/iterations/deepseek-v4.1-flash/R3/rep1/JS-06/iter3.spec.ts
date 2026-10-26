import { test, expect } from '../../../../../support/fixtures';
test('JS-06 Реєстрація нового користувача', async ({ page }) => {
  const uniqueEmail = `new_user_${Date.now()}@example.com`;

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User is not logged in (fresh browser context, no session storage/cookies).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByRole('textbox', { name: 'Email address field' }).fill(uniqueEmail);

  // Step 6
  await page.getByRole('textbox', { name: 'Field for the password' }).fill('NewUser123!');

  // Step 7
  await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill('NewUser123!');

  // Step 8
  await page.getByRole('combobox', { name: 'Selection list for the security question' }).click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page
    .getByRole('textbox', { name: 'Field for the answer to the security question' })
    .fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Button to complete the registration' }).click();

  // Expected 1
  await expect(
    page.getByText('Registration completed successfully. You can now log in.')
  ).toBeVisible();

  // Expected 2
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
