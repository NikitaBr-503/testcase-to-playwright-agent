```ts
import { test, expect } from '@playwright/test';

test('JS-20 Change the quantity of a product in the basket', async ({ page }) => {
  // Preconditions
  // - The welcome dialog and the cookie banner are already dismissed by the test environment.
  // - The user qa_user@example.com is registered.
  // - The basket of the user is empty.

  // Step 1
  await page.goto('/');

  // Preconditions (verified): the product list is shown and the basket is empty
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(page.getByRole('button', { name: 'Add to Basket' }).first()).toBeVisible();
  await expect(basketButton).toContainText(/Your Basket\s*0/);

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();

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
  await expect(page.getByRole('button', { name: 'Add to Basket' }).first()).toBeVisible();
  await expect(
    page.getByRole('textbox', { name: 'Text field for the login password' })
  ).toBeHidden();

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toContainText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();

  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();

  // Step 9
  const quantityCell = basketRow.getByRole('cell').nth(1);
  await expect(quantityCell).toHaveText(/^[^\d]*1[^\d]*$/);
  await quantityCell.getByRole('button').first().click();

  // Expected 1
  await expect(quantityCell).toHaveText(/^[^\d]*2[^\d]*$/);
  await expect(page.getByText(/Total Price:\s*3\.98\s*¤/).last()).toBeVisible();

  // Step 10
  await quantityCell.getByRole('button').last().click();

  // Expected 2
  await expect(quantityCell).toHaveText(/^[^\d]*1[^\d]*$/);
  await expect(page.getByText(/Total Price:\s*1\.99\s*¤/).last()).toBeVisible();
});
```