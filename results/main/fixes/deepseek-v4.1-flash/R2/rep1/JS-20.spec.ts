import { test, expect } from '../../../../../support/fixtures';
test('JS-20 Зміна кількості товару в кошику', async ({ page }) => {
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
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  const quantityCell = basketRow.getByRole('cell').nth(2);


  await basketRow.getByRole('button').nth(1).click();

  // Expected 1
  await expect(quantityCell).toContainText('2');
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await basketRow.getByRole('button').nth(0).click();

  // Expected 2
  await expect(quantityCell).toContainText('1');
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
