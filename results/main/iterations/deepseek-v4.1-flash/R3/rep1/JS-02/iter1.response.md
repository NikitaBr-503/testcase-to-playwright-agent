```ts
import { test, expect } from '@playwright/test';

test('JS-02 Успішний вхід зареєстрованого користувача', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Expected 1
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log in' })).toBeHidden();

  // Step 7
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Expected 2
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
  await expect(page.getByText('qa_user@example.com')).toBeVisible();
});
```