import { test, expect } from '../../../../../support/fixtures';
test('JS-12 Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context is used, so no session exists.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  const loginMenuItem = page.getByRole('menuitem', { name: 'Go to login page' });
  await expect(loginMenuItem).toBeVisible();
  await loginMenuItem.click();

  // Step 4
  const emailInput = page.getByRole('textbox', { name: 'Text field for the login email' });
  await expect(emailInput).toBeVisible();
  await emailInput.fill('qa_user@example.com');

  // Expected 1
  const logInButton = page.getByRole('button', { name: 'Login', exact: true });
  await expect(logInButton).toBeVisible();
  await expect(logInButton).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/#\/login$/);
  await expect(page.getByRole('heading', { name: 'Login', level: 1 })).toBeVisible();
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toHaveValue('qa_user@example.com');
});
