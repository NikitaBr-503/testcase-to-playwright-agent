import { test, expect } from '../../../../../support/fixtures';
test('JS-14 Додавання відгуку до товару', async ({ page }) => {
  const reviewText = `Дуже смачно ${Date.now()}`;

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  const loginMenuItem = page
    .getByRole('menuitem', { name: 'Login' })
    .or(page.getByRole('button', { name: 'Login', exact: true }));
  await expect(loginMenuItem).toBeVisible();
  await loginMenuItem.click();

  // Step 4
  await page.getByRole('textbox', { name: /email/i }).fill('qa_user@example.com');

  // Step 5
  await page.getByPlaceholder(/password/i).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page.getByRole('button', { name: /Banana Juice \(1000ml\)/ }).click();

  const productDialog = page.getByRole('dialog');
  await expect(productDialog).toBeVisible();

  // Step 8
  const reviewInput = productDialog
    .getByRole('textbox', { name: /review/i })
    .or(productDialog.getByPlaceholder(/what did you think/i));
  await reviewInput.fill(reviewText);

  // Step 9
  await productDialog.getByRole('button', { name: 'Submit' }).click();

  // Expected 1
  await expect(page.getByText('You review has been saved.')).toBeVisible();

  // Expected 2
  await expect(page.getByText(reviewText)).toBeVisible();
});
