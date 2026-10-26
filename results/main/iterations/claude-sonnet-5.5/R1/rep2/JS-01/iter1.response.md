```ts
import { test, expect } from '@playwright/test';

test('JS-01 Вхід із неправильним паролем', async ({ page }) => {
  // Preconditions
  // The user qa_user@example.com is registered and the welcome dialog / cookie banner are dismissed by the environment.
  // The user is not logged in: a fresh browser context is used for each test.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword1!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Expected 1
  await expect(page.getByText('Invalid email or password.')).toBeVisible();

  // Expected 2
  await expect(page).toHaveURL(/\/#\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
```