import { test, expect } from '../../../../../support/fixtures';
test('JS-16 Видалення товару з кошика', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const userEmail = 'qa_user@example.com';
  const userPassword = 'QaPassword123!';

  // The basket button's accessible name comes from its aria-label ("Show the shopping cart"),
  // the visible label/counter is part of its text content.
  const basketButton = page.getByRole('button', { name: /shopping cart/i });

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // qa_user@example.com is a registered user; the user's basket is empty (verified in step 1).

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('img', { name: productName })).toBeVisible();
  // Precondition check: the basket counter shows 0, i.e. the basket is empty
  await expect(basketButton).toBeVisible();
  await expect(basketButton).toContainText(/Your Basket\s*0/);

  // Step 2
  await page.getByRole('button', { name: /account menu/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login', exact: true }).click();

  // Step 4
  await page.getByLabel('Email', { exact: true }).fill(userEmail);

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill(userPassword);

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page.getByRole('button', { name: /account menu/i })).toContainText(/qa_user/);

  // Step 7
  const productCard = page.locator('article').filter({ hasText: productName });
  await expect(productCard).toBeVisible();
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toContainText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();
  await expect(page).toHaveURL(/\/basket/);

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  await basketRow.getByRole('button').last().click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: productName })).toHaveCount(0);
  await expect(page.getByText(productName)).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toContainText(/Your Basket\s*0/);
});
