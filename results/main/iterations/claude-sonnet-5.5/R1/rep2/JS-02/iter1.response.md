```ts
import { test, expect } from '@playwright/test';

test('JS-02 Успішний вхід зареєстрованого користувача', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the environment.
  // The user qa_user@example.com is registered and not logged in (fresh browser context).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Expected 1
  await expect(page).not.toHaveURL(/\/login/);
  await expect(page.getByRole('button', { name: 'Log in' })).toHaveCount(0);
  await expect(page.locator('app-search-result, .mat-grid-list').first()).toBeVisible();

  // Step 7
  await page.getByRole('button', { name: 'Account' }).click();

  // Expected 2
  await expect(page.getByRole('menuitem', { name: 'qa_user@example.com' })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
});
```