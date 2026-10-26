import { test, expect } from '../../../../../support/fixtures';
test('JS-14 Додавання відгуку до товару', async ({ page }) => {
  const reviewText = `Дуже смачно ${Date.now()}`;

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // Registered user qa_user@example.com exists; the user is not logged in.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Account' })).toBeVisible();

  // Step 7
  await page.getByRole('link', { name: 'Banana Juice (1000ml)' }).click();
  await expect(page.getByRole('heading', { name: 'Banana Juice (1000ml)' })).toBeVisible();

  // Step 8
  await page.getByRole('textbox', { name: 'Review' }).fill(reviewText);

  // Step 9
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expected 1
  await expect(page.getByText('You review has been saved.')).toBeVisible();

  // Expected 2
  await expect(page.getByText(reviewText)).toBeVisible();
});
