```ts
import { test, expect } from '@playwright/test';

test('JS-12 Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user is not logged in: the test runs in a fresh browser context without any session.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  const loginMenuItem = page
    .getByRole('menuitem', { name: /login/i })
    .or(page.getByRole('button', { name: /login/i }));
  await expect(loginMenuItem).toBeVisible();
  await loginMenuItem.click();

  // Step 4
  const emailInput = page.getByLabel('Email').or(page.getByPlaceholder('Email'));
  await expect(emailInput).toBeVisible();
  await emailInput.fill('qa_user@example.com');

  // Expected 1
  const logInButton = page.getByRole('button', { name: /log\s?in/i });
  await expect(logInButton).toBeVisible();
  await expect(logInButton).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/\/login$/);
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toHaveValue('qa_user@example.com');
});
```