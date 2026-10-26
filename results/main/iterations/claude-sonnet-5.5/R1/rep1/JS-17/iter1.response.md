```ts
import { test, expect } from '@playwright/test';

test('JS-17 Вихід із системи', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByRole('textbox', { name: /email/i }).fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /log in/i }).click();

  // Step 7
  await page.getByRole('button', { name: /account/i }).click();

  // Step 8
  await page.getByRole('menuitem', { name: /logout/i }).click();

  // Step 9
  await page.getByRole('button', { name: /account/i }).click();

  // Expected 1
  const menu = page.getByRole('menu');
  await expect(menu.getByRole('menuitem', { name: /login/i })).toBeVisible();

  // Expected 2
  await expect(menu.getByText('qa_user@example.com')).toHaveCount(0);
});
```