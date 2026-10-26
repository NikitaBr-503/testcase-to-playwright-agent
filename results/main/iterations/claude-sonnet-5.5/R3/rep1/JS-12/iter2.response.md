The accessibility snapshot shows the login button's accessible name is "Login", not "Log in". The visible text is "Log in", but the button's accessible name comes from an `aria-label`. The `getByRole` locator therefore has to use "Login". An exact match avoids also matching "Login with Google", whose accessible name is "Login with Google".

```ts
import { test, expect } from '@playwright/test';

test('JS-12 Кнопка входу недоступна без пароля', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user is not logged in: a fresh browser context is used for each test.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Expected 1
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeDisabled();

  // Expected 2
  await expect(page).toHaveURL(/\/#\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
```