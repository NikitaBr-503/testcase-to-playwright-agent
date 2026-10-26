import { test, expect } from '../../../../../support/fixtures';
test('JS-21 Додавання нової адреси доставки', async ({ page }) => {
  // Preconditions: the welcome dialog and the cookie banner are already dismissed by the
  // test environment. The user qa_user@example.com is registered, is not logged in and
  // has no saved addresses yet.

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
  await page.getByRole('button', { name: /^Log ?in$/i }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeHidden();

  // Step 7
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 8
  await page.getByRole('menuitem', { name: 'Orders & Payment' }).click();

  // Step 9
  await page.getByRole('menuitem', { name: 'My saved addresses' }).click();

  // Step 10
  await page.getByRole('button', { name: 'Add New Address' }).click();

  // Resolves an address form field either through its label or, if the label is not
  // programmatically associated, through the form field that carries the visible label text.
  const addressField = (label: string) =>
    page
      .getByLabel(label, { exact: true })
      .or(page.locator('mat-form-field').filter({ hasText: label }).locator('input'));

  // Step 11
  await addressField('Country').fill('Ukraine');

  // Step 12
  await addressField('Name').fill('QA User');

  // Step 13
  await addressField('Mobile Number').fill('5012345678');

  // Step 14
  await addressField('ZIP Code').fill('01001');

  // Step 15
  await addressField('Address').fill('Khreshchatyk 1');

  // Step 16
  await addressField('City').fill('Kyiv');

  // Step 17
  await addressField('State').fill('Kyiv');

  // Step 18
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expected 1
  await expect(
    page.getByText('The address at Kyiv has been successfully added to your addresses.')
  ).toBeVisible();

  // Expected 2
  const savedAddress = page.locator('mat-card, tr').filter({ hasText: 'QA User' }).last();
  await expect(savedAddress).toBeVisible();
  await expect(savedAddress).toContainText('QA User');
  await expect(savedAddress).toContainText('Kyiv');
});
