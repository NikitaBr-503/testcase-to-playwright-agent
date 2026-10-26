import { test, expect } from '../../../../../support/fixtures';
test('JS-21: Додавання нової адреси доставки', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered, not logged in and has no saved addresses.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/i }).click();

  // Step 4
  await page.getByLabel('Text field for the login email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Text field for the login password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: /^(Login|Log in)$/i }).click();

  // Step 7
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 8
  await page.getByRole('menuitem', { name: /Orders (&|and) Payment/i }).click();

  // Step 9
  await page.getByRole('menuitem', { name: /saved address/i }).click();

  // Step 10
  await page.getByRole('button', { name: /add (a )?new address/i }).click();

  // Step 11
  await page.getByPlaceholder('Please provide a country.').fill('Ukraine');

  // Step 12
  await page.getByPlaceholder('Please provide a name.').fill('QA User');

  // Step 13
  await page.getByPlaceholder('Please provide a mobile number.').fill('5012345678');

  // Step 14
  await page.getByPlaceholder('Please provide a ZIP code.').fill('01001');

  // Step 15
  await page.getByPlaceholder('Please provide an address.').fill('Khreshchatyk 1');

  // Step 16
  await page.getByPlaceholder('Please provide a city.').fill('Kyiv');

  // Step 17
  await page.getByPlaceholder('Please provide a state.').fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: /submit/i }).click();

  // Expected 1
  await expect(
    page.getByText('The address at Kyiv has been successfully added to your addresses.')
  ).toBeVisible();

  // Expected 2
  await expect(page).toHaveURL(/\/address\/saved/);
  const addressRow = page.getByRole('row').filter({ hasText: 'QA User' });
  await expect(addressRow).toBeVisible();
  await expect(addressRow).toContainText('Kyiv');
});
