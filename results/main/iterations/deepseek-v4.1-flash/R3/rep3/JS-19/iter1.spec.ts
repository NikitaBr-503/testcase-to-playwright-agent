import { test, expect } from '../../../../../support/fixtures';
test('JS-19 Пошук товару та додавання його до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The registered user qa_user@example.com exists and the user's basket is empty
  // (the empty basket is verified right after the start page has been opened).

  // Step 1
  await page.goto('/');

  // Preconditions: the basket of the registered user is empty
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  await expect(basketButton).toContainText('Your Basket 0');

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
    'qa_user@example.com',
  );

  // Step 7
  await page.getByRole('button', { name: 'Open search' }).click();

  // Step 8
  const searchInput = page.getByRole('textbox');
  await searchInput.fill('banana');
  await searchInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Search Results - banana', { exact: true })).toBeVisible();

  // Step 9
  const bananaJuiceCard = page
    .locator('article')
    .filter({ hasText: 'Banana Juice (1000ml)' });
  await bananaJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 2
  await expect(
    page.getByText('Placed Banana Juice (1000ml) into basket.', { exact: true }),
  ).toBeVisible();

  // Expected 3
  await expect(basketButton).toContainText('Your Basket 1');
});
