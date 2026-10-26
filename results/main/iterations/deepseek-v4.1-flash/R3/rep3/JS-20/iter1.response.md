```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com (QaPassword123!) is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel(/email/i).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel(/password/i).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const quantityCell = basketRow.getByRole('cell').nth(1);
  const increaseButton = basketRow
    .getByRole('button')
    .filter({ has: page.locator('mat-icon', { hasText: /^add/ }) });
  await increaseButton.click();

  // Expected 1
  await expect(quantityCell).toContainText('2');
  await expect(page.getByText(/Total Price:\s*3\.98\s*¤/)).toBeVisible();

  // Step 10
  const decreaseButton = basketRow
    .getByRole('button')
    .filter({ has: page.locator('mat-icon', { hasText: /^remove/ }) });
  await decreaseButton.click();

  // Expected 2
  await expect(quantityCell).toContainText('1');
  await expect(page.getByText(/Total Price:\s*1\.99\s*¤/)).toBeVisible();
});
```