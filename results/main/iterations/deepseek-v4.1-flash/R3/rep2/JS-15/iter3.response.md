```ts
import { test, expect } from '@playwright/test';

test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered (logged in during the steps below).
  // The basket of the user must be empty.
  await page.goto('/');
  const cartButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(cartButton).toContainText('0');

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add to Basket' }).first()).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  const emailField = page.getByRole('textbox', { name: 'Text field for the login email' });
  await expect(emailField).toBeVisible();
  await emailField.fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^Log ?in$/i }).click();
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toContainText('qa_user@example.com');

  // Back on the product overview to add the items
  await page.goto('/');
  await expect(page.getByText('All Products', { exact: true })).toBeVisible();

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaJuiceCard = page.getByRole('article').filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(cartButton).toContainText('2');

  // Step 9
  await cartButton.click();

  // Expected 2
  const appleJuiceRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const bananaJuiceRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(appleJuiceRow).toHaveCount(1);
  await expect(bananaJuiceRow).toHaveCount(1);
  await expect(appleJuiceRow.getByRole('spinbutton')).toHaveValue('1');
  await expect(bananaJuiceRow.getByRole('spinbutton')).toHaveValue('1');

  // Expected 3
  await expect(page.getByText(/Total Price:\s*3\.98¤/).first()).toBeVisible();
});
```