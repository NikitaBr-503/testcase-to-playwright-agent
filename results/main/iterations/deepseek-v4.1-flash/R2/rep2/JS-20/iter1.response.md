```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const basketButton = page.getByRole('button', { name: /Your Basket|shopping cart/i });

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment,
  // qa_user@example.com is a registered user and the user's basket is empty.
  await page.goto('/');
  await expect(basketButton).toContainText('0');

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login', exact: true }).click();

  // Step 4
  await page.getByLabel('Email', { exact: true }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Login succeeded: the login button is gone and the product overview is shown again
  await expect(page.getByRole('button', { name: 'Log in' })).toBeHidden();
  await expect(page.getByRole('article').first()).toBeVisible();

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: productName });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await basketButton.click();

  // Step 9
  const basketRow = page.locator('mat-row, tr, [role="row"]').filter({ hasText: productName });
  await expect(basketRow).toBeVisible();
  const increaseButton = basketRow
    .getByRole('button')
    .filter({ has: page.locator('i[class*="plus"]') });
  await increaseButton.click();

  // Expected 1
  const quantityCell = basketRow
    .locator('mat-cell, [role="cell"]')
    .filter({ has: page.locator('i[class*="minus"]') });
  await expect(quantityCell).toHaveText('2');
  await expect(page.getByText(/Total Price:\s*3\.98\s*¤/)).toBeVisible();

  // Step 10
  const decreaseButton = basketRow
    .getByRole('button')
    .filter({ has: page.locator('i[class*="minus"]') });
  await decreaseButton.click();

  // Expected 2
  await expect(quantityCell).toHaveText('1');
  await expect(page.getByText(/Total Price:\s*1\.99\s*¤/)).toBeVisible();
});
```