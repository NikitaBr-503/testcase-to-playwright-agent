```ts
import { test, expect } from '@playwright/test';

test('JS-12: Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the environment;
  // a fresh browser context guarantees the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  const emailField = page.getByLabel(/email/i);
  await emailField.fill('qa_user@example.com');

  // Expected 1
  const loginButton = page
    .getByRole('button', { name: /log in/i })
    .filter({ hasNotText: /google/i });
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/\/login/);
  await expect(emailField).toHaveValue('qa_user@example.com');
});
```