```ts
import { test, expect } from '@playwright/test';

test('JS-16 Видалення товару з кошика', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  const accountMenuButton = page.getByRole('button', { name: 'Show/hide account menu' });

  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The registered user (qa_user@example.com / QaPassword123!) is used as test data below.

  // Step 1
  await page.goto('/');
  const productCard = page.getByRole('article').filter({ hasText: productName });
  await expect(productCard.first()).toBeVisible();
  // Precondition: the basket of the registered user is empty
  await expect(basketButton).toContainText(/Your Basket\s*0/);

  // Step 2
  await accountMenuButton.click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  const emailInput = page.locator('#email');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await emailInput.fill('qa_user@example.com');

  // Step 5
  await page.locator('#password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).not.toHaveURL(/#\/login/);
  await expect(accountMenuButton).toBeVisible();

  // Step 7
  await productCard.first().getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toContainText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();
  await expect(page).toHaveURL(/#\/basket/);

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: productName });
  await expect(basketRow.first()).toBeVisible();
  const deleteButton = basketRow.first().getByRole('button').last();
  await expect(deleteButton).toBeEnabled();
  await deleteButton.click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: productName })).toHaveCount(0);
  await expect(page.getByRole('row').filter({ hasText: productName })).toBeHidden();

  // Expected 2
  await expect(basketButton).toContainText(/Your Basket\s*0/);
});
```