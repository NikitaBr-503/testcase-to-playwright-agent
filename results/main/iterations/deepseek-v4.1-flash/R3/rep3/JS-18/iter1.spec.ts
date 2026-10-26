import { test, expect } from '../../../../../support/fixtures';
test('JS-18 Подання скарги', async ({ page }) => {
  // Preconditions: welcome dialog and cookie banner already dismissed by the test environment,
  // user qa_user@example.com is registered and not logged in.

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
  await page.getByRole('button', { name: /Log ?in/i }).click();

  // Step 7
  await page.getByRole('button', { name: 'Open Sidenav' }).click();

  // Step 8
  await page.getByRole('link', { name: 'Complaint' }).click();

  // Expected 1
  await expect(page.getByLabel('Customer')).toHaveValue('qa_user@example.com');

  // Step 9
  await page.getByLabel('Message').fill('Замовлення доставлено пошкодженим');

  // Step 10
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expected 2
  const confirmation = page.getByText(
    /Customer support will get in touch with you soon! Your complaint reference is #/
  );
  await expect(confirmation).toBeVisible();
  await expect(confirmation).toContainText(
    'Customer support will get in touch with you soon! Your complaint reference is #'
  );
});
