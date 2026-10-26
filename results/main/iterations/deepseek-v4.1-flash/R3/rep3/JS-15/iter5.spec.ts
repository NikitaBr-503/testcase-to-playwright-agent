import { test, expect } from '../../../../../support/fixtures';
test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // Registered user qa_user@example.com exists; basket is empty.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

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
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toContainText(
    'qa_user@example.com'
  );

  // Step 7
  await page.goto('/');
  const appleCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleCard).toBeVisible();
  await appleCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaCard = page.locator('article').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(bananaCard).toBeVisible();
  await bananaCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  const basketButton = page.getByRole('button', { name: /Your Basket/ });
  await expect(basketButton).toContainText('2');

  // Step 9
  await basketButton.click();

  // Expected 2
  const appleRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  const bananaRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(appleRow).toBeVisible();
  await expect(bananaRow).toBeVisible();
  await expect(appleRow.locator('input').first()).toHaveValue('1');
  await expect(bananaRow.locator('input').first()).toHaveValue('1');

  // Expected 3
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();
});
