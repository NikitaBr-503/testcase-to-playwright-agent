import { test, expect } from '../../../../../support/fixtures';
test('JS-18 Подання скарги', async ({ page }) => {
  // Preconditions
  // The user qa_user@example.com is registered and not logged in; dialogs are already dismissed.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page.getByRole('button', { name: /menu/i }).click();

  // Step 8
  await page.getByText('Complaint', { exact: true }).click();

  // Expected 1
  await expect(page.getByLabel('Customer')).toHaveValue('qa_user@example.com');

  // Step 9
  await page.getByLabel('Message').fill('Замовлення доставлено пошкодженим');

  // Step 10
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expected 2
  await expect(
    page.getByText(/^Customer support will get in touch with you soon! Your complaint reference is #/)
  ).toBeVisible();
});
