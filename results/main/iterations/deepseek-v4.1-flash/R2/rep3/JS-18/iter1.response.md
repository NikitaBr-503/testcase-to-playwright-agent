```ts
import { test, expect } from '@playwright/test';

test('JS-18 Подання скарги', async ({ page, context }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and no user is logged in (fresh session).
  await context.clearCookies();

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page.getByRole('button', { name: 'Open Sidenav' }).click();

  // Step 8
  await page.getByRole('link', { name: 'Complaint' }).click();

  // Step 9
  await page.getByRole('textbox', { name: 'Message' }).fill('Замовлення доставлено пошкодженим');

  // Expected 1
  await expect(page.getByRole('textbox', { name: 'Customer' })).toHaveValue('qa_user@example.com');

  // Step 10
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expected 2
  await expect(
    page.getByText(/Customer support will get in touch with you soon! Your complaint reference is #/)
  ).toBeVisible();
});
```