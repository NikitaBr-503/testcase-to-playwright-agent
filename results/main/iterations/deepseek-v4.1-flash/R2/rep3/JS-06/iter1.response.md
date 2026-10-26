```ts
import { test, expect } from '@playwright/test';

test('JS-06 Реєстрація нового користувача', async ({ page }) => {
  const email = `new_user_${Date.now()}@example.com`;
  const password = 'NewUser123!';

  // Preconditions: welcome dialog and cookie banner are dismissed by the test environment;
  // the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByRole('textbox', { name: 'Email' }).fill(email);

  // Step 6
  await page.getByLabel('Password', { exact: true }).fill(password);

  // Step 7
  await page.getByLabel('Repeat Password', { exact: true }).fill(password);

  // Step 8
  await page.getByRole('combobox', { name: 'Security Question' }).click();
  await page
    .getByRole('option', { name: 'Your eldest siblings middle name?' })
    .click();

  // Step 9
  await page.getByLabel('Answer', { exact: true }).fill('Kyiv');

  // Step 10
  await page.getByRole('button', { name: 'Register' }).click();

  // Expected 1
  await expect(
    page.getByText('Registration completed successfully. You can now log in.')
  ).toBeVisible();

  // Expected 2
  await expect(page).toHaveURL(/\/#\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
```