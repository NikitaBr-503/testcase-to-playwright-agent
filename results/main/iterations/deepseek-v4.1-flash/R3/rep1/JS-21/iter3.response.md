```ts
import { test, expect } from '@playwright/test';

test('JS-21 Додавання нової адреси доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered, is not logged in and has no saved addresses.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

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
  await expect(page.getByRole('heading', { name: 'Login' })).toBeHidden();

  // Step 7
  // Make sure no account menu overlay is left open after the login navigation.
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 8
  await page.getByRole('menuitem', { name: /orders\s*(and|&)\s*payment/i }).click();

  // Step 9
  await page.getByRole('menuitem', { name: /saved address/i }).click();
  await expect(page.getByRole('heading', { name: 'My saved addresses' })).toBeVisible();

  // Step 10
  // Close the (sub)menu overlay so it cannot intercept the click on the page content.
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /add.*address/i }).click();
  await expect(page.getByRole('heading', { name: 'Add New Address' })).toBeVisible();

  // Step 11
  // The Country field is a free-text input (with autocomplete), not a combobox.
  const countryField = page.getByRole('textbox', { name: 'Country' });
  await countryField.fill('Ukraine');
  await countryField.press('Tab');

  // Step 12
  await page.getByRole('textbox', { name: 'Name' }).fill('QA User');

  // Step 13
  // The Mobile Number field is rendered as a number input (spinbutton).
  await page.getByRole('spinbutton', { name: 'Mobile Number' }).fill('5012345678');

  // Step 14
  await page.getByRole('textbox', { name: 'ZIP Code' }).fill('01001');

  // Step 15
  await page.getByRole('textbox', { name: 'Address' }).fill('Khreshchatyk 1');

  // Step 16
  await page.getByRole('textbox', { name: 'City' }).fill('Kyiv');

  // Step 17
  await page.getByRole('textbox', { name: 'State' }).fill('Kyiv');

  // Step 18
  const submitButton = page.getByRole('button', { name: 'Submit' });
  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  // Expected 1
  await expect(
    page.getByText('The address at Kyiv has been successfully added to your addresses.')
  ).toBeVisible();

  // Expected 2
  await expect(page.getByRole('heading', { name: 'My saved addresses' })).toBeVisible();
  await expect(page.getByText('QA User')).toBeVisible();
  await expect(page.getByText('Kyiv').first()).toBeVisible();
});
```