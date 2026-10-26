import { test, expect } from '../../../../../support/fixtures';
test('JS-16 Видалення товару з кошика', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The registered user qa_user@example.com / QaPassword123! is used as test data below.

  // Step 1
  await page.goto('/');
  // Preconditions: the basket of the user is empty
  await expect(basketButton).toContainText(/Your Basket\s*0/);

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login', exact: true }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: productName });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await basketButton.click();

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  await basketRow.getByRole('button', { name: /delete/i }).click();

  // Expected 1
  await expect(basketRow).toHaveCount(0);
  await expect(page.getByRole('row').filter({ hasText: productName })).toBeHidden();

  // Expected 2
  await expect(basketButton).toContainText(/Your Basket\s*0/);
});
