import { test, expect } from '../../../../../support/fixtures';
test('JS-14 Додавання відгуку до товару', async ({ page }) => {
  const reviewText = `Дуже смачно ${Date.now()}`;

  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toBeVisible();

  // Step 7
  await page.getByRole('button', { name: /Banana Juice \(1000ml\)/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Step 8
  await dialog.getByRole('textbox', { name: /review/i }).fill(reviewText);

  // Step 9
  await dialog.getByRole('button', { name: /Submit/ }).click();

  // Expected 1
  await expect(page.getByText('You review has been saved.')).toBeVisible();

  // Expected 2
  const reviewsHeader = dialog.getByRole('button', { name: /Reviews/ });
  await expect(reviewsHeader).toBeVisible();
  if ((await reviewsHeader.getAttribute('aria-expanded')) === 'false') {
    await reviewsHeader.click();
  }
  await expect(dialog.getByText(reviewText)).toBeVisible();
});
