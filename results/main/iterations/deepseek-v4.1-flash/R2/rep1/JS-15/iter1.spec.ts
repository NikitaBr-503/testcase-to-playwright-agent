import { test, expect } from '../../../../../support/fixtures';
test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  const cartButton = page.getByRole('button', { name: /show the shopping cart/i });
  const productCard = (name: string) => page.locator('article').filter({ hasText: name });

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered.

  // Step 1
  await page.goto('/');

  // Preconditions (continued): the basket of the user is empty
  await expect(cartButton).toContainText('0');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 7
  await productCard('Apple Juice (1000ml)')
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Step 8
  await productCard('Banana Juice (1000ml)')
    .getByRole('button', { name: 'Add to Basket' })
    .click();

  // Expected 1
  await expect(cartButton).toContainText('2');

  // Step 9
  await cartButton.click();

  // Expected 2
  // The basket shows both products, each of them added once (the price of 1.99¤
  // per product is confirmed by the total price checked below).
  const basket = page
    .locator('app-purchase-basket, app-basket, mat-sidenav')
    .filter({ hasText: 'Banana Juice (1000ml)' })
    .last();
  await expect(basket).toBeVisible();
  await expect(basket.getByText('Apple Juice (1000ml)', { exact: true }).first()).toBeVisible();
  await expect(basket.getByText('Banana Juice (1000ml)', { exact: true }).first()).toBeVisible();

  // Expected 3
  await expect(page.getByText(/^Total Price:\s*3\.98¤$/).first()).toBeVisible();
});
