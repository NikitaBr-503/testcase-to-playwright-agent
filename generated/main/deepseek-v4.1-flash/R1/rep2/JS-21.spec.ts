import { test, expect } from '../../../../../support/fixtures';
test('JS-21 Додавання нової адреси доставки', async ({ page }) => {
  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered, is not logged in and has no saved addresses yet.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByText('Login', { exact: true }).click();

  // Step 4
  await page.getByLabel('Email', { exact: true }).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password', { exact: true }).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 8
  await page.getByText('Orders & Payment', { exact: true }).click();

  // Step 9
  await page.getByText('My saved addresses', { exact: true }).click();

  // Step 10
  await page.getByRole('button', { name: 'Add New Address' }).click();

  // Step 11
  await page.getByLabel('Country', { exact: true }).fill('Ukraine');

  // Step 12
  await page.getByLabel('Name', { exact: true }).fill('QA User');

  // Step 13
  await page.getByLabel('Mobile Number', { exact: true }).fill('5012345678');

  // Step 14
  await page.getByLabel('ZIP Code', { exact: true }).fill('01001');

  // Step 15
  await page.getByLabel('Address', { exact: true }).fill('Khreshchatyk 1');

  // Step 16
  await page.getByLabel('City', { exact: true }).fill('Kyiv');

  // Step 17
  await page.getByLabel('State', { exact: true }).fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expected 1
  await expect(
    page.getByText('The address at Kyiv has been successfully added to your addresses.')
  ).toBeVisible();

  // Expected 2
  const savedAddress = page
    .locator('li, article, [data-testid*="address"]')
    .filter({ hasText: 'QA User' })
    .filter({ hasText: 'Kyiv' });

  await expect(savedAddress.first()).toBeVisible();
  await expect(savedAddress.first()).toContainText('QA User');
  await expect(savedAddress.first()).toContainText('Kyiv');
});
