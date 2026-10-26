import { test, expect } from '../../../../../support/fixtures';
test('JS-14 Додавання відгуку до товару', async ({ page }) => {
  const reviewText = `Дуже смачно ${Date.now()}`;

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Go to login page' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Step 4
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  const loginButton = page.getByRole('button', { name: /^Log ?in$/ });
  await expect(loginButton).toBeEnabled();
  await loginButton.click();
  await expect(page).not.toHaveURL(/#\/login/);
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeHidden();

  // Step 7
  await page.getByRole('img', { name: 'Banana Juice (1000ml)' }).click();
  await expect(page.getByLabel('Review')).toBeVisible();

  // Step 8
  await page.getByLabel('Review').fill(reviewText);

  // Step 9
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expected 1
  await expect(page.getByText('You review has been saved.')).toBeVisible();

  // Expected 2
  await expect(page.getByText(reviewText)).toBeVisible();
});
