```ts
import { test, expect } from '@playwright/test';

test('JS-17 Вихід із системи', async ({ page }) => {
  const email = 'qa_user@example.com';
  const password = 'QaPassword123!';

  // Preconditions
  // The user is registered and not logged in; the welcome dialog and cookie banner are already dismissed.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByLabel('Email').fill(email);

  // Step 5
  await page.locator('#password').fill(password);

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page.getByRole('button', { name: /account/i }).click();
  await expect(page.getByText(email)).toBeVisible();

  // Step 8
  await page.getByRole('menuitem', { name: /logout/i }).click();

  // Step 9
  await page.getByRole('button', { name: /account/i }).click();

  // Expected 1
  await expect(page.getByRole('menuitem', { name: /login/i })).toBeVisible();

  // Expected 2
  await expect(page.getByText(email)).toHaveCount(0);
});
```