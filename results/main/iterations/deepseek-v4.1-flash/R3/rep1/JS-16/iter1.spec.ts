import { test, expect } from '../../../../../support/fixtures';
test('JS-16 Видалення товару з кошика', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const userEmail = 'qa_user@example.com';
  const userPassword = 'QaPassword123!';

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // Registered user qa_user@example.com exists; the basket of the user is empty.
  await page.goto('/');
  await expect(page.getByRole('button', { name: /Your Basket\s+0$/ })).toBeVisible();

  // Step 1
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: /account menu/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill(userEmail);

  // Step 5
  await page.getByLabel('Password').fill(userPassword);

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  // Step 7
  const productCard = page.locator('article').filter({ hasText: productName });
  await expect(productCard).toBeVisible();
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(page.getByRole('button', { name: /Your Basket\s+1$/ })).toBeVisible();

  // Step 8
  await page.getByRole('button', { name: /Your Basket/ }).click();
  await expect(page).toHaveURL(/\/basket/);

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  await basketRow.locator('button').last().click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: productName })).toHaveCount(0);
  await expect(page.getByText(productName)).toHaveCount(0);

  // Expected 2
  await expect(page.getByRole('button', { name: /Your Basket\s+0$/ })).toBeVisible();
});
