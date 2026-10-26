import { test, expect } from '../../../../../support/fixtures';
test('JS-12 Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context is used, so no session exists.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Account' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Expected 1
  const loginButton = page.getByRole('button', { name: 'Log in' });
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByLabel('Email')).toHaveValue('qa_user@example.com');
  await expect(loginButton).toBeVisible();
});
