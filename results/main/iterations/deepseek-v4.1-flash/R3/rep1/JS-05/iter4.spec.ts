import { test, expect } from '../../../../../support/fixtures';
test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions
  // - Welcome dialog and cookie banner are already dismissed by the test environment
  // - User qa_user@example.com is registered
  // - The user's basket is empty
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();
  await expect(basketButton).toHaveText(/Your Basket\s*0/);

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Step 4
  await page
    .getByRole('textbox', { name: /Text field for the login email|Email/ })
    .fill('qa_user@example.com');

  // Step 5
  await page
    .getByRole('textbox', { name: /Text field for the login password|Password/ })
    .fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeHidden();
  await expect(page.getByText('All Products')).toBeVisible();

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
  await expect(basketButton).toHaveText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();

  // Expected 2
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await expect(basketRow).toContainText('Apple Juice (1000ml)');
  await expect(basketRow.getByRole('cell').filter({ hasText: /^1$/ })).toContainText('1');
  await expect(basketRow).toContainText('1.99¤');

  // Expected 3
  await expect(page.getByText(/Total Price:\s*1\.99¤/)).toBeVisible();
});
