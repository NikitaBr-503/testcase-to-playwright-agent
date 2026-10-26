import { test, expect } from '../../../../../support/fixtures';
test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered (logged in during the steps below).
  // The basket of the user must be empty.
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('0');

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaJuiceCard = page.getByRole('article').filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('2');

  // Step 9
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 2
  const appleJuiceRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const bananaJuiceRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(appleJuiceRow).toHaveCount(1);
  await expect(bananaJuiceRow).toHaveCount(1);
  await expect(appleJuiceRow.getByRole('cell').nth(1)).toContainText('1');
  await expect(bananaJuiceRow.getByRole('cell').nth(1)).toContainText('1');

  // Expected 3
  await expect(page.getByText(/Total Price:\s*3\.98¤/).first()).toBeVisible();
});
