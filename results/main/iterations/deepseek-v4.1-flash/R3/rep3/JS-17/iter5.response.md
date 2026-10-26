```ts
import { test, expect } from '@playwright/test';

test('JS-17 Вихід із системи', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();

  // Step 8
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Expected 1
  const accountMenu = page.getByRole('menu');
  await expect(accountMenu.getByRole('menuitem', { name: 'Login' })).toBeVisible();

  // Expected 2
  await expect(accountMenu.getByText('qa_user@example.com')).toHaveCount(0);
});
```