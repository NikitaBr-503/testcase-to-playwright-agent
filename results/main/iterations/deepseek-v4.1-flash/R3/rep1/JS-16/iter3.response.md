```ts
import { test, expect } from '@playwright/test';

test('JS-16 Видалення товару з кошика', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const userEmail = 'qa_user@example.com';
  const userPassword = 'QaPassword123!';

  // The cart button exposes its aria-label "Show the shopping cart"; the visible
  // label and the counter are part of its text content.
  const basketButton = page.getByRole('button', { name: /shopping cart/i });
  const accountButton = page.getByRole('button', { name: /account menu/i });
  const logoutItem = page.getByRole('menuitem', { name: /log\s*out/i });

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // qa_user@example.com is a registered user and the basket must be empty.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('img', { name: productName })).toBeVisible();
  // Precondition check: the basket counter shows 0, i.e. the basket is empty
  await expect(basketButton).toBeVisible();
  await expect(basketButton).toContainText(/Your Basket\s*0/);

  // Step 2
  await accountButton.click();
  await expect(accountButton).toHaveAttribute('aria-expanded', 'true');

  // Step 3
  // The menu entry's accessible name is "Go to login page" (visible text "Login").
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByLabel('Email', { exact: true }).fill(userEmail);

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill(userPassword);

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  // Verify the user is logged in: the account menu now offers "Logout".
  await accountButton.click();
  await expect(logoutItem).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(logoutItem).toBeHidden();

  // Step 7
  const productCard = page.locator('article').filter({ hasText: productName });
  await expect(productCard).toBeVisible();
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toContainText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();
  await expect(page).toHaveURL(/basket/);

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  // The delete (trash) button is the last button inside the product row.
  await basketRow.getByRole('button').last().click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: productName })).toHaveCount(0);
  await expect(page.getByRole('cell', { name: productName })).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toContainText(/Your Basket\s*0/);
});
```