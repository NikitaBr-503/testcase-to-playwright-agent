import { test, expect } from '../../../../../support/fixtures';
test('JS-23 Реєстрація і вхід новим користувачем', async ({ page }) => {
  // Дані нового користувача: адреса має бути унікальною, тому додаємо Date.now()
  const newUserEmail = `new_login_${Date.now()}@example.com`;
  const newUserPassword = 'Login123!';
  const securityAnswer = 'Kyiv';

  // Preconditions
  // Вітальне вікно та банер про cookies вже закриті налаштуваннями тестового середовища;
  // користувач не увійшов до системи (кнопка «Account» показує меню незалогованого користувача).

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /account/i }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();

  // Step 5
  await page.getByLabel(/^Email/).fill(newUserEmail);

  // Step 6
  await page.getByRole('textbox', { name: 'Field for the password' }).fill(newUserPassword);

  // Step 7
  await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill(newUserPassword);

  // Step 8
  await page.getByRole('combobox', { name: /security question/i }).click();
  await page.getByRole('option', { name: 'Your eldest siblings middle name?' }).click();

  // Step 9
  await page.getByRole('textbox', { name: 'Field for the answer to the security question' }).fill(securityAnswer);

  // Step 10
  await page.getByRole('button', { name: 'Button to complete the registration' }).click();

  // Step 11
  // Після реєстрації відкривається сторінка «Login»
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill(newUserEmail);

  // Step 12
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill(newUserPassword);

  // Step 13
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).not.toHaveURL(/login/);

  // Step 14
  await page.getByRole('button', { name: 'Show the shopping cart' }).click();

  // Expected 1
  // Сторінка кошика має заголовок «Your Basket (<зареєстрована адреса>)»
  const basketHeading = page.getByRole('heading', { name: /your basket/i });
  await expect(basketHeading).toBeVisible();
  await expect(basketHeading).toContainText(`Your Basket (${newUserEmail})`);

  // Expected 2
  // Кошик порожній: у ньому немає жодного товару (жодного товару з ціною у ¤)
  await expect(page.locator('mat-row')).toHaveCount(0);
});
