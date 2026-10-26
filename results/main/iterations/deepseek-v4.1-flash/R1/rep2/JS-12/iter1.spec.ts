import { test, expect } from '../../../../../support/fixtures';
test('JS-12 Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in (fresh browser context, no session).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Expected 1
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log in' })).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
