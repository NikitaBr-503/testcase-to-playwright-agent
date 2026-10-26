import { test, expect } from '../../../../../support/fixtures';
test('JS-14 Додавання відгуку до товару', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the environment.
  // The user qa_user@example.com is registered and not logged in (fresh browser context).
  const reviewText = `Дуже смачно ${Date.now()}`;

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').first().fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^Log ?in( button)?$/i }).click();

  // Step 7
  await page.getByText('Banana Juice (1000ml)').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Step 8
  await dialog.getByRole('textbox', { name: /review|what did you like/i }).fill(reviewText);

  // Step 9
  await dialog.getByRole('button', { name: /submit|send the review/i }).click();

  // Expected 1
  await expect(page.getByText('You review has been saved.')).toBeVisible();

  // Expected 2
  await dialog.getByRole('button', { name: /Reviews/ }).click();
  await expect(dialog.getByText(reviewText)).toBeVisible();
});
