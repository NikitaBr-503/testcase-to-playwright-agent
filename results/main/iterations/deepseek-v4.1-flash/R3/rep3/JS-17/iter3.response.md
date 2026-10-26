```ts
import { test, expect } from '@playwright/test';

test('JS-17 Вихід із системи', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Step 4
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toContainText('qa_user@example.com');

  // Step 7
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();
  await expect(page.getByRole('menu').getByText('qa_user@example.com')).toBeVisible();

  // Step 8
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toContainText('Account');

  // Step 9
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Expected 1
  await expect(page.getByRole('menuitem', { name: 'Login' })).toBeVisible();

  // Expected 2
  await expect(page.getByRole('menu').getByText('qa_user@example.com')).toHaveCount(0);
});
```