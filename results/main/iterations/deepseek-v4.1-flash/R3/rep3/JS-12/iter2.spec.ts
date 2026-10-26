import { test, expect } from '../../../../../support/fixtures';
test('JS-12 Кнопка входу недоступна без пароля', async ({ page }) => {
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
  await expect(page.getByRole('heading', { name: 'Login', level: 1 })).toBeVisible();

  // Step 4
  const emailField = page.getByRole('textbox', { name: 'Text field for the login email' });
  await emailField.fill('qa_user@example.com');
  await expect(emailField).toHaveValue('qa_user@example.com');

  // Expected 1
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/#\/login$/);
  await expect(page.getByRole('heading', { name: 'Login', level: 1 })).toBeVisible();
});
