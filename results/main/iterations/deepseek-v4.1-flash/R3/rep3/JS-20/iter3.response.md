```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and the user's basket is empty.

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

  const appleJuiceRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceRow).toBeVisible();

  // The quantity cell holds: [decrease "-"] [quantity] [increase "+"]
  const quantityCell = appleJuiceRow.getByRole('cell').nth(2);

  // Step 9
  const increaseQuantityButton = quantityCell.getByRole('button').last();
  await expect(increaseQuantityButton).toBeVisible();
  await increaseQuantityButton.click();

  // Expected 1
  await expect(quantityCell).toContainText(/(?:^|\D)2(?:\D|$)/);
  await expect(page.getByText(/Total Price:\s*3\.98\s*¤/)).toBeVisible();

  // Step 10
  const decreaseQuantityButton = quantityCell.getByRole('button').first();
  await expect(decreaseQuantityButton).toBeVisible();
  await decreaseQuantityButton.click();

  // Expected 2
  await expect(quantityCell).toContainText(/(?:^|\D)1(?:\D|$)/);
  await expect(page.getByText(/Total Price:\s*1\.99\s*¤/)).toBeVisible();
});
```