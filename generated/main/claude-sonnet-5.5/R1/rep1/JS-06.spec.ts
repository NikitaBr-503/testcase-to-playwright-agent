import { test, expect } from '../../../../../support/fixtures';
test('JS-06 Реєстрація нового користувача', async ({ page }) => {
  // Preconditions
  const email = `new_user_${Date.now()}@example.com`;
  const password = 'NewUser123!';

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByText('Not yet a customer?').click();

  // Step 5
  await page.getByLabel('Email address field').fill(email);

  // Step 6
  await page.getByLabel('Field for the password').fill(password);

  // Step 7
  await page.getByLabel('Field to confirm the password').fill(password);

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

  // Expected 2
  await expect(page).toHaveURL(/\/#\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
