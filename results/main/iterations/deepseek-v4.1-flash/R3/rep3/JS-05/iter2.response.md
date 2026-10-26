```ts
import { test, expect } from '@playwright/test';

test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page
    .getByRole('textbox', { name: 'Text field for the login email' })
    .fill('qa_user@example.com');

  // Step 5
  await page
    .getByRole('textbox', { name: 'Text field for the login password' })
    .fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(
    page.getByRole('button', { name: 'Show/hide account menu' })
  ).toContainText('Account');

  // Step 7
  const appleJuiceCard = page
    .getByRole('article')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceCard).toBeVisible();
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(
    page.getByText('Placed Apple Juice (1000ml) into basket.')
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Show the shopping cart' })
  ).toContainText(/Your Basket\s*1/);

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 2
  const basketRow = page
    .getByRole('row')
    .filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await expect(basketRow.getByRole('spinbutton')).toHaveValue('1');

  // Expected 3
  const totalPriceRow = page.getByRole('row').filter({ hasText: 'Total Price' });
  await expect(totalPriceRow).toBeVisible();
  await expect(totalPriceRow).toContainText('1.99¤');
});
```