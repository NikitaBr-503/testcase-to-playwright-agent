```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com / QaPassword123! is registered and the basket is empty.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

  // Step 4
  await page.getByRole('textbox', { name: /login email/i }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: /login password/i }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^log\s?in$/i }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeHidden();

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();
  await expect(page).toHaveURL(/basket/);

  // Step 9
  const basketContent = page.getByRole('main');
  const increaseQuantityButton = basketContent.locator(
    [
      'button:has(mat-icon:text-matches("^add"))',
      'button[aria-label*="increase" i]',
      'button[aria-label*="add one" i]',
      'button[aria-label*="plus" i]',
      'button:text-is("+")',
    ].join(', ')
  );
  await expect(increaseQuantityButton).toBeVisible();
  await increaseQuantityButton.click();

  // Expected 1
  await expect(basketContent.getByText('2', { exact: true }).first()).toBeVisible();
  await expect(page.locator('body')).toContainText(/Total Price:\s*3\.98\s*¤/);

  // Step 10
  const decreaseQuantityButton = basketContent.locator(
    [
      'button:has(mat-icon:text-matches("^remove"))',
      'button[aria-label*="decrease" i]',
      'button[aria-label*="remove one" i]',
      'button[aria-label*="minus" i]',
      'button:text-is("−")',
      'button:text-is("-")',
    ].join(', ')
  );
  await expect(decreaseQuantityButton).toBeVisible();
  await decreaseQuantityButton.click();

  // Expected 2
  await expect(basketContent.getByText('1', { exact: true }).first()).toBeVisible();
  await expect(page.locator('body')).toContainText(/Total Price:\s*1\.99\s*¤/);
});
```