```ts
import { test, expect } from '@playwright/test';

test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions
  // - Welcome dialog and cookie banner are already dismissed by the test environment
  // - User qa_user@example.com is registered
  // - The user's basket is empty
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();
  await expect(basketButton).toContainText('Your Basket 0');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  // Step 7
  const appleJuiceCard = page
    .locator('article')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceCard).toBeVisible();
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(
    page.getByText('Placed Apple Juice (1000ml) into basket.')
  ).toBeVisible();
  await expect(basketButton).toContainText('Your Basket 1');

  // Step 8
  await basketButton.click();

  // Expected 2
  const basketRow = page
    .locator('tr')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await expect(basketRow.getByRole('spinbutton')).toHaveValue('1');

  // Expected 3
  const totalPriceRow = page.locator('tr').filter({ hasText: 'Total Price' });
  await expect(totalPriceRow).toContainText('Total Price');
  await expect(totalPriceRow).toContainText('1.99¤');
});
```