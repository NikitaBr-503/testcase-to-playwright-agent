```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  const productName = 'Apple Juice (1000ml)';
  const topBar = page.locator('mat-toolbar').first();

  // Preconditions:
  // - Welcome dialog and cookie banner are already dismissed by the test environment
  // - User qa_user@example.com is registered
  // - The user's basket is empty

  // Step 1
  await page.goto('/');

  // Step 2
  await topBar.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).not.toHaveURL(/\/login/);

  // Step 7
  const productCard = page.locator('mat-card').filter({ hasText: productName });
  await productCard.getByRole('button', { name: /add to basket/i }).click();

  // Step 8
  await topBar.getByRole('button', { name: /basket|cart/i }).click();
  await expect(page).toHaveURL(/\/basket/);

  // Step 9
  await page.locator('button:has(mat-icon:text-is("add"))').click();

  // Expected 1
  const quantity = page.locator(
    'xpath=//button[.//mat-icon[text()="remove"]]/following-sibling::*[1]'
  );
  await expect(quantity).toHaveText('2');
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await page.locator('button:has(mat-icon:text-is("remove"))').click();

  // Expected 2
  await expect(quantity).toHaveText('1');
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
```