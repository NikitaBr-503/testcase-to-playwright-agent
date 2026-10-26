```ts
import { test, expect } from '@playwright/test';

test('JS-16 Видалення товару з кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered. The basket must be empty.
  const accountButton = page.getByRole('button', { name: 'Show/hide account menu' });
  const basketButton = page.getByRole('button', { name: 'Show the shopping cart' });

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();
  // precondition check: basket is empty
  await expect(basketButton).toHaveText(/Your Basket\s*0/);

  // Step 2
  await accountButton.click();

  // Step 3
  await page.getByRole('menuitem', { name: /login/i }).click();
  const emailField = page.getByRole('textbox', { name: 'Text field for the login email' });
  const passwordField = page.getByRole('textbox', { name: 'Text field for the login password' });
  await expect(emailField).toBeVisible();
  await expect(passwordField).toBeVisible();

  // Step 4
  await emailField.fill('qa_user@example.com');

  // Step 5
  await passwordField.fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^Log ?in$/i }).click();
  // successful login leaves the login page
  await expect(page.getByRole('heading', { name: 'Login' })).toHaveCount(0);
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 7
  const appleJuiceCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceCard).toBeVisible();
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();
  await expect(basketButton).toHaveText(/Your Basket\s*1/);

  // Step 8
  await basketButton.click();
  await expect(page).toHaveURL(/#\/basket/);
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();

  // Step 9
  // the delete (trash) control of the row - matched by its icon text so it works
  // whether the icon is a button or a bare material icon inside the cell
  const deleteButton = basketRow
    .locator('button, mat-icon, i.material-icons')
    .filter({ hasText: /delete/i })
    .last();
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  // Expected 1
  await expect(page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' })).toHaveCount(0);

  // Expected 2
  await expect(basketButton).toHaveText(/Your Basket\s*0/);
});
```