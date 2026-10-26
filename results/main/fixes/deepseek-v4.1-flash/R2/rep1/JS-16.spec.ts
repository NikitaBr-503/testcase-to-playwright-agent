import { test, expect } from '../../../../../support/fixtures';
test('JS-16 Видалення товару з кошика', async ({ page }) => {
  // Preconditions: the welcome dialog and cookie banner are already dismissed by the test environment;
  // qa_user@example.com is registered; the user's basket is empty.
  const productName = 'Apple Juice (1000ml)';
  const accountButton = page.getByRole('button', { name: 'Show/hide account menu' });
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  const productCard = page.getByRole('article').filter({ hasText: productName });

  // Step 1
  await page.goto('/');

  // Step 2
  await accountButton.click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(productCard).toBeVisible();

  // Step 7
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await basketButton.click();

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await basketRow.getByRole('button').last().click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: productName })).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toContainText(/Your Basket\s*0/);
});
