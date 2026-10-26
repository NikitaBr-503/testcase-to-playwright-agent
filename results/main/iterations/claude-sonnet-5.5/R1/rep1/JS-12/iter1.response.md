```ts
import { test, expect } from '@playwright/test';

test('JS-12 Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are dismissed by the environment; the user is not logged in (fresh context).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Expected 1
  await expect(page.getByRole('button', { name: /log in$/i })).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/\/#\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
```