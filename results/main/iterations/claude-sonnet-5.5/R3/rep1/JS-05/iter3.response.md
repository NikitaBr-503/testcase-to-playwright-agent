The login button has the accessible name "Login" (its `aria-label`), while its visible text is "Log in". That is why `getByRole('button', { name: 'Log in', exact: true })` never matched. I changed the locator to the accessible name "Login", exact match, which excludes "Login with Google".

The basket page checks also use more robust locators. I kept the earlier row and quantity locators but made them less dependent on Angular Material class names. The row is found by its text, and the total by a text regex.

```ts
import { test, expect } from '@playwright/test';

test('JS-05 Додавання товару до кошика', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered; the basket is assumed to be empty.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill('qa_user@example.com');

  // Step 5
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Step 7
  const productCard = page.getByRole('article').filter({ hasText: 'Apple Juice (1000ml)' });
  await productCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Expected 1
  await expect(page.getByText('Placed Apple Juice (1000ml) into basket.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText('1');

  // Step 8
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 2
  await expect(page.getByRole('heading', { name: 'Your Basket' })).toBeVisible();
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await expect(basketRow).toContainText(/\b1\b/);

  // Expected 3
  await expect(page.getByText(/Total Price:\s*1\.99¤/)).toBeVisible();
});
```