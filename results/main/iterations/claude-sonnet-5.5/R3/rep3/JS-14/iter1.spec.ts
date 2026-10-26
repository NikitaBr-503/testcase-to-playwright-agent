import { test, expect } from '../../../../../support/fixtures';
test('JS-14 Додавання відгуку до товару', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; user is registered and logged out.
  const reviewText = `Дуже смачно ${Date.now()}`;

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByRole('textbox', { name: /email/i }).fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page
    .getByRole('button', { name: 'Click for more information about the product' })
    .filter({ hasText: 'Banana Juice (1000ml)' })
    .click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Step 8
  await dialog.getByRole('textbox', { name: /review/i }).fill(reviewText);

  // Step 9
  await dialog.getByRole('button', { name: /submit|send the review/i }).click();

  // Expected 1
  await expect(page.getByText('You review has been saved.')).toBeVisible();

  // Expected 2
  await dialog.getByRole('button', { name: /reviews/i }).click();
  await expect(dialog.getByText(reviewText)).toBeVisible();
});
