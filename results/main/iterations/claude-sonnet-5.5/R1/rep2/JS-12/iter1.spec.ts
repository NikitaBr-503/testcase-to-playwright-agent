import { test, expect } from '../../../../../support/fixtures';
test('JS-12 Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context has no session.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  const emailInput = page.getByRole('textbox', { name: /email/i });
  await emailInput.fill('qa_user@example.com');

  // Expected 1
  await expect(page.getByRole('button', { name: /^log\s?in$/i })).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/#\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
