import { test, expect } from '../../../../../support/fixtures';
test('JS-18 Подання скарги', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is registered and not logged in.

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

  // Step 7
  await page.getByRole('button', { name: 'Open Sidenav' }).click();

  // Step 8
  await page.getByRole('link', { name: 'Complaint' }).click();

  // Expected 1
  await expect(page.getByLabel('Text field for the customer email')).toHaveValue('qa_user@example.com');

  // Step 9
  await page.getByLabel('Text field for the complaint message').fill('Замовлення доставлено пошкодженим');

  // Step 10
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  // Expected 2
  await expect(
    page.getByText(/^Customer support will get in touch with you soon! Your complaint reference is #/)
  ).toBeVisible();
});
