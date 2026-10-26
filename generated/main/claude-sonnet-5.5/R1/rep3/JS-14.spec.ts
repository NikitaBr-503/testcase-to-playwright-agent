import { test, expect } from '../../../../../support/fixtures';
test('JS-14 Додавання відгуку до товару', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.
  const reviewText = `Дуже смачно ${Date.now()}`;

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /Account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/i }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: false }).first().fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /Log in/i }).click();

  // Step 7
  await page.getByText('Banana Juice (1000ml)').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Step 8
  await dialog.getByRole('textbox', { name: /review/i }).fill(reviewText);

  // Step 9
  await dialog.getByRole('button', { name: /submit|send the review/i }).click();

  // Expected 1
  await expect(page.getByText('You review has been saved.')).toBeVisible();

  // Expected 2
  const reviewsHeader = dialog.getByRole('button', { name: /Reviews/i });
  if ((await reviewsHeader.getAttribute('aria-expanded')) !== 'true') {
    await reviewsHeader.click();
  }
  await expect(dialog.getByText(reviewText)).toBeVisible();
});
