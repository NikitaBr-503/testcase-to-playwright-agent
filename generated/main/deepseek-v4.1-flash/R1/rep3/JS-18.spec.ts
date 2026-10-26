import { test, expect } from '../../../../../support/fixtures';
test('JS-18: Подання скарги', async ({ page }) => {
  // Preconditions: welcome dialog and cookie banner already dismissed by the test environment;
  // user qa_user@example.com is registered; user is not logged in.

  // Step 1: Відкрити головну сторінку.
  await page.goto('/');

  // Step 2: Натиснути кнопку «Account» у верхній панелі.
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3: Обрати пункт «Login».
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4: Ввести в поле «Email» значення «qa_user@example.com».
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5: Ввести в поле «Password» значення «QaPassword123!».
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6: Натиснути кнопку «Log in».
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7: Натиснути кнопку меню (☰) у лівому верхньому куті.
  await page.getByRole('button', { name: /☰/ }).click();

  // Step 8: Обрати пункт «Complaint».
  await page.getByRole('menuitem', { name: 'Complaint' }).click();

  // Expected 1: Поле «Customer» заповнене адресою «qa_user@example.com».
  await expect(page.getByLabel('Customer')).toHaveValue('qa_user@example.com');

  // Step 9: Ввести в поле «Message» текст «Замовлення доставлено пошкодженим».
  await page.getByLabel('Message').fill('Замовлення доставлено пошкодженим');

  // Step 10: Натиснути кнопку «Submit».
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expected 2: Відображається повідомлення, що починається словами
  // «Customer support will get in touch with you soon! Your complaint reference is #».
  await expect(
    page.getByText(
      /Customer support will get in touch with you soon! Your complaint reference is #/
    )
  ).toBeVisible();
});
