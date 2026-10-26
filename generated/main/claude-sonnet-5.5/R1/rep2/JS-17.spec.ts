import { test, expect } from '../../../../../support/fixtures';
test('JS-17 Вихід із системи', async ({ page }) => {
  // Preconditions
  // Користувач qa_user@example.com зареєстрований, але не увійшов до системи (новий контекст браузера)

  // Step 1
  await page.goto('/');

  // Step 2
  const accountButton = page.getByRole('button', { name: /account/i });
  await accountButton.click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await accountButton.click();

  // Step 8
  await page.getByRole('menuitem', { name: /logout/i }).click();

  // Step 9
  await accountButton.click();

  // Expected 1
  await expect(page.getByRole('menuitem', { name: /login/i })).toBeVisible();

  // Expected 2
  await expect(page.getByText('qa_user@example.com')).toHaveCount(0);
});
