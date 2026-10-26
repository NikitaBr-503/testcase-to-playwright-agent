import { test, expect } from '../../../../../support/fixtures';
test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and the basket is expected to be empty.
  await page.goto('/');
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(basketButton).toHaveText(/Your Basket\s*0/);

  // Step 1
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
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  const bananaJuiceCard = page.locator('article').filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 9
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 1
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toHaveText(/Your Basket\s*2/);

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)')).toBeVisible();
  await expect(page.getByText('Banana Juice (1000ml)')).toBeVisible();
  const quantities = page.getByRole('spinbutton');
  await expect(quantities).toHaveCount(2);
  await expect(quantities.first()).toHaveValue('1');
  await expect(quantities.nth(1)).toHaveValue('1');

  // Expected 3
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();
});
