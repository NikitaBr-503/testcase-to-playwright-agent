import { test, expect } from '../../../../../support/fixtures';
test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // Registered user: qa_user@example.com / QaPassword123!
  // The user's basket is empty before the test.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();


  // Step 7
  const appleJuiceCard = page
    .locator('article')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(page.getByText('Placed Apple Juice (1000ml) into basket.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 2
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await expect(basketRow.getByRole('cell').nth(2)).toHaveText('1');

  // Expected 3
  const totalPriceRow = page.getByText(/Total Price:/);
  await expect(totalPriceRow).toContainText('1.99¤');
});
