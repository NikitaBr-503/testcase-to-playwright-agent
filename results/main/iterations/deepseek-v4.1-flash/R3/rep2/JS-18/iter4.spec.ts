import { test, expect } from '../../../../../support/fixtures';
test('JS-18 Подання скарги', async ({ page }) => {
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
  await page.getByRole('button', { name: /^log ?in$/i }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeHidden();

  // Step 7
  await page.getByRole('button', { name: 'Open Sidenav' }).click();

  // Step 8
  // The sidenav link is labelled "Go to complain page" and shows the text "Complaint".
  await page.getByRole('link', { name: /complain/i }).click();
  await expect(page.getByRole('heading', { name: 'Complaint' })).toBeVisible();

  // Expected 1
  // The "Customer" field is a disabled textbox whose accessible name is
  // "Text field for the mail address of the user".
  const customerField = page.getByRole('textbox', { name: 'Text field for the mail address of the user' });
  await expect(customerField).toBeVisible();
  await expect(customerField).toHaveValue('qa_user@example.com');

  // Step 9
  await page.getByRole('textbox', { name: 'Field for entering the complaint' }).fill('Замовлення доставлено пошкодженим');

  // Step 10
  const submitButton = page.getByRole('button', { name: 'Button to send the complaint' });
  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  // Expected 2
  const confirmation = page.getByText(/Customer support will get in touch with you soon!/);
  await expect(confirmation).toBeVisible();
  await expect(confirmation).toContainText(/Your complaint reference is #\d+/);
});
