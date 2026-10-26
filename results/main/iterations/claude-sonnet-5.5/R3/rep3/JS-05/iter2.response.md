The login button's accessible name is "Login" (its `aria-label`), while "Log in" is only its visible text. Because `getByRole` matches on the accessible name, the previous locator never found it. I changed the locator to `{ name: 'Login' }`, using `exact: true` so it can't match "Login with Google".

I also tightened the other locators, which the previous run never reached:
- The `mat-card` locator for the product card is replaced with an `article`-style lookup, because the snapshot shows articles. I locate the card with `page.locator('mat-card', ...)`. In Juice Shop that is the real element, so it stays.
- In the basket, the Total Price text is checked through `getByText`, not `#price`.


```ts
import { test, expect } from '@playwright/test';

test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered; the basket is empty for this user.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Text field for the login email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 7
  const productCard = page.locator('mat-card', { hasText: 'Apple Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(page.getByText('Placed Apple Juice (1000ml) into basket.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 2
  await expect(page).toHaveURL(/\/basket/);
  await expect(page.getByRole('heading', { name: 'Your Basket' })).toBeVisible();
  const basketRow = page.locator('mat-row', { hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await expect(basketRow.locator('.mat-column-quantity')).toContainText('1');

  // Expected 3
  await expect(page.getByText('Total Price')).toBeVisible();
  await expect(page.getByText('Total Price')).toContainText('1.99¤');
});
```