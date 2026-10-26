import { test, expect } from '../../../../../support/fixtures';
test('JS-12 Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: the account menu still shows the anonymous "Account" label.
  await page.goto('/');
  const accountMenuButton = page.getByRole('button', { name: 'Show/hide account menu' });
  await expect(accountMenuButton).toBeVisible();
  await expect(accountMenuButton).toContainText('Account');

  // Step 1
  // (Start page is already open via the navigation above.)

  // Step 2
  await accountMenuButton.click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Expected 1
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('qa_user@example.com');
});
