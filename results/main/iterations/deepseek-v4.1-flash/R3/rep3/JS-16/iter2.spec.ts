import { test, expect } from '../../../../../support/fixtures';
test('JS-16 Видалення товару з кошика', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });

  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The registered user qa_user@example.com / QaPassword123! is used as test data below.

  // Step 1
  await page.goto('/');
  // Precondition: the basket of the registered user is empty
  await expect(basketButton).toContainText(/Your Basket\s*0/);

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.locator('#email').fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 7
  const productCard = page.getByRole('article').filter({ hasText: productName });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toContainText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();
  await expect(page).toHaveURL(/basket/);

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  const deleteButton = basketRow.getByRole('button').last();
  await expect(deleteButton).toBeEnabled();
  await deleteButton.click();

  // Expected 1
  await expect(basketRow).toHaveCount(0);
  await expect(page.getByRole('row').filter({ hasText: productName })).toHaveCount(0);
  await expect(page.getByText(productName)).toBeHidden();

  // Expected 2
  await expect(basketButton).toContainText(/Your Basket\s*0/);
});
