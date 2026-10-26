import { test, expect } from '../../../../../support/fixtures';
test('JS-15 Додавання двох різних товарів до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered and the basket is expected to be empty.
  await page.goto('/');
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(basketButton).toBeVisible();
  await expect(basketButton).toHaveText(/Your Basket\s*0/);

  // Step 1
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Step 4
  const emailField = page.getByRole('textbox', { name: 'Text field for the login email' });
  await emailField.fill('qa_user@example.com');
  await expect(emailField).toHaveValue('qa_user@example.com');

  // Step 5
  const passwordField = page.getByRole('textbox', { name: 'Text field for the login password' });
  await passwordField.fill('QaPassword123!');
  await expect(passwordField).toHaveValue('QaPassword123!');

  // Step 6
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  await expect(loginButton).toBeEnabled();
  await loginButton.click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeHidden();

  // Step 7
  const appleJuiceCard = page.locator('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceCard).toHaveCount(1);
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toHaveText(/Your Basket\s*1/);

  // Step 8
  const bananaJuiceCard = page.locator('article').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(bananaJuiceCard).toHaveCount(1);
  await bananaJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toHaveText(/Your Basket\s*2/);

  // Step 9
  await basketButton.click();
  await expect(page.getByRole('heading', { name: /Your Basket/ })).toBeVisible();

  // Expected 1
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toHaveText(
    /Your Basket\s*2/
  );

  // Expected 2
  await expect(page.getByText('Apple Juice (1000ml)', { exact: true })).toBeVisible();
  await expect(page.getByText('Banana Juice (1000ml)', { exact: true })).toBeVisible();

  const appleRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleRow).toHaveCount(1);
  const appleQuantity = appleRow.getByRole('cell').filter({ hasText: /^1$/ });
  await expect(appleQuantity).toHaveCount(1);
  await expect(appleQuantity).toHaveText('1');

  const bananaRow = page.getByRole('row').filter({ hasText: 'Banana Juice (1000ml)' });
  await expect(bananaRow).toHaveCount(1);
  const bananaQuantity = bananaRow.getByRole('cell').filter({ hasText: /^1$/ });
  await expect(bananaQuantity).toHaveCount(1);
  await expect(bananaQuantity).toHaveText('1');

  // Expected 3
  await expect(page.getByText(/Total Price:\s*3\.98\s*¤/)).toBeVisible();
});
