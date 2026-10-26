```ts
import { test, expect } from '@playwright/test';

test('JS-01: Вхід із неправильним паролем', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered; the user is not logged in (fresh browser context).

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/\/login/);

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('WrongPassword1!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Expected 1
  await expect(page.getByText('Invalid email or password.')).toBeVisible();

  // Expected 2
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
```