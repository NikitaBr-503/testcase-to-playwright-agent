```ts
import { test, expect } from '@playwright/test';

test('JS-12 Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context is used for this test.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).first().click();

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
});
```