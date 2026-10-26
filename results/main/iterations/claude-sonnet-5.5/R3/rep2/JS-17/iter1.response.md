```ts
import { test, expect } from '@playwright/test';

test('JS-17 Вихід із системи', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Text field for the login email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();

  // Step 7
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 8
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Expected 1
  await expect(page.getByRole('menuitem', { name: 'Login' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('qa_user@example.com')).toHaveCount(0);
});
```