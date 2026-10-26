```ts
import { test, expect } from '@playwright/test';

test('JS-21 Додавання нової адреси доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered, is currently logged out and has no saved addresses.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login', exact: true }).click();

  // Step 4
  await page
    .getByRole('textbox', { name: 'Text field for the login email' })
    .fill('qa_user@example.com');

  // Step 5
  await page
    .getByRole('textbox', { name: 'Text field for the login password' })
    .fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  // the login form is left behind once the user is authenticated
  await expect(page).not.toHaveURL(/#\/login/);

  // Step 7
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 8
  await page.getByRole('menuitem', { name: 'Orders & Payment' }).click();

  // Step 9
  await page.getByRole('menuitem', { name: 'My saved addresses' }).click();

  // Step 10
  await page.getByRole('button', { name: 'Add New Address' }).click();

  // Step 11
  await page.getByLabel('Country').fill('Ukraine');

  // Step 12
  await page.getByLabel('Name').fill('QA User');

  // Step 13
  await page.getByLabel('Mobile Number').fill('5012345678');

  // Step 14
  await page.getByLabel('ZIP Code').fill('01001');

  // Step 15
  await page.getByLabel('Address').fill('Khreshchatyk 1');

  // Step 16
  await page.getByLabel('City').fill('Kyiv');

  // Step 17
  await page.getByLabel('State').fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expected 1
  await expect(
    page.getByText('The address at Kyiv has been successfully added to your addresses.')
  ).toBeVisible();

  // Expected 2
  await expect(page).toHaveURL(/\/address\/saved/);
  await expect(page.getByRole('heading', { name: /saved addresses/i })).toBeVisible();
  const savedAddressRow = page
    .getByRole('row')
    .filter({ hasText: 'QA User' })
    .filter({ hasText: 'Kyiv' });
  await expect(savedAddressRow).toBeVisible();
  await expect(savedAddressRow).toContainText('QA User');
  await expect(savedAddressRow).toContainText('Kyiv');
});
```