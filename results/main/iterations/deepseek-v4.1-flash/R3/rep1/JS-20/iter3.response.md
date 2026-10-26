```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // - Welcome dialog and cookie banner are already dismissed by the test environment
  // - User qa_user@example.com is registered
  // - The user's basket is empty

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toHaveText(/Your Basket\s*0/);

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Text field for the login email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^Log\s?in$/i }).click();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();

  // The quantity cell holds: [decrease button] <quantity> [increase button]
  const quantityCell = basketRow.getByRole('cell').nth(2);
  const decreaseButton = quantityCell.getByRole('button').first();
  const increaseButton = quantityCell.getByRole('button').last();

  // Step 9
  await increaseButton.click();

  // Expected 1
  await expect(quantityCell).toHaveText('2');
  await expect(page.getByText(/Total Price:\s*3\.98\s*¤/)).toBeVisible();

  // Step 10
  await decreaseButton.click();

  // Expected 2
  await expect(quantityCell).toHaveText('1');
  await expect(page.getByText(/Total Price:\s*1\.99\s*¤/)).toBeVisible();
});
```