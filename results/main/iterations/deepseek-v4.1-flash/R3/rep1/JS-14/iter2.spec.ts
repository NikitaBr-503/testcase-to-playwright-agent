import { test, expect } from '../../../../../support/fixtures';
test('JS-14 Додавання відгуку до товару', async ({ page }) => {
  const reviewText = `Дуже смачно ${Date.now()}`;

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Step 4
  await page
    .getByRole('textbox', { name: 'Text field for the login email' })
    .fill('qa_user@example.com');

  // Step 5
  await page
    .getByRole('textbox', { name: 'Text field for the login password' })
    .fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^log ?in$/i }).click();
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toContainText(
    'qa_user@example.com'
  );

  // Step 7
  await page
    .locator('article')
    .filter({ hasText: 'Banana Juice (1000ml)' })
    .getByRole('button', { name: 'Click for more information about the product' })
    .click();
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
