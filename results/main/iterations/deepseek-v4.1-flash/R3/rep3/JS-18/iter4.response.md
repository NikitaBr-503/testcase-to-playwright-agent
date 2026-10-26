```ts
import { test, expect } from '@playwright/test';

test('JS-18 Подання скарги', async ({ page }) => {
  // Preconditions: welcome dialog and cookie banner are already dismissed by the test environment,
  // user qa_user@example.com is registered and not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page
    .getByRole('textbox', { name: 'Text field for the login email' })
    .fill('qa_user@example.com');

  // Step 5
  await page
    .getByRole('textbox', { name: 'Text field for the login password' })
    .fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^Log ?in$/i }).click();

  // Step 7
  await page.getByRole('button', { name: 'Open Sidenav' }).click();

  // Step 8
  await page.getByRole('link', { name: /complain/i }).click();

  // Expected 1
  const customerField = page.getByRole('textbox', {
    name: 'Text field for the mail address of the user',
  });
  await expect(customerField).toBeVisible();
  await expect(customerField).toHaveValue('qa_user@example.com');

  // Step 9
  await page
    .getByRole('textbox', { name: 'Field for entering the complaint' })
    .fill('Замовлення доставлено пошкодженим');

  // Step 10
  const submitButton = page.getByRole('button', {
    name: 'Button to send the complaint',
  });
  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  // Expected 2
  const confirmation = page.getByText(
    /Customer support will get in touch with you soon! Your complaint reference is #/
  );
  await expect(confirmation).toBeVisible();
  await expect(confirmation).toContainText(
    'Customer support will get in touch with you soon! Your complaint reference is #'
  );
});
```