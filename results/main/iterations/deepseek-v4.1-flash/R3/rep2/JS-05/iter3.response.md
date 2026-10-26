```ts
import { test, expect } from '@playwright/test';

test('JS-05 Додавання товару до кошика', async ({ page }) => {
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and the basket is empty.

  // Step 1
  await page.goto('/');
  await expect(appleJuiceCard).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Go to login page' }).click();

  // Step 4
  await page
    .getByRole('textbox', { name: 'Text field for the login email' })
    .fill('qa_user@example.com');

  // Step 5
  await page
    .getByRole('textbox', { name: 'Text field for the login password' })
    .fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 7
  await expect(appleJuiceCard).toBeVisible();
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(page.getByText('Placed Apple Juice (1000ml) into basket.')).toBeVisible();
  await expect(basketButton).toContainText('1');

  // Step 8
  await basketButton.click();

  // Expected 2
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await expect(basketRow).toContainText('Apple Juice (1000ml)');
  const quantity = basketRow
    .getByRole('spinbutton')
    .or(basketRow.getByRole('textbox'))
    .or(basketRow.getByText('1', { exact: true }))
    .first();
  await expect(quantity).toBeVisible();
  await expect(basketRow).toContainText('1.99¤');

  // Expected 3
  const totalPrice = page.getByText('Total Price: 1.99¤');
  await expect(totalPrice).toBeVisible();
  await expect(totalPrice).toContainText('1.99¤');
});
```