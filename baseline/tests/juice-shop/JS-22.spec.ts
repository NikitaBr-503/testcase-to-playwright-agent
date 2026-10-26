import { test, expect } from '../../fixtures';
import { juiceShop, uniqueEmail } from '../../helpers/data';

const data = juiceShop.users.passwordChange;
const { messages } = juiceShop;

test('JS-22 Зміна пароля новим користувачем', async ({ catalog, nav, loginPage, registrationPage, changePassword, page }) => {
  const email = uniqueEmail(data.emailPrefix, data.emailDomain);

  await test.step('Step 1: відкрити головну сторінку', () => catalog.open());
  await test.step('Steps 2–3: Account → Login', () => nav.goToLogin());
  await test.step('Step 4: Not yet a customer?', () => loginPage.registerLink.click());
  await test.step('Steps 5–9: заповнити форму реєстрації', async () => {
    await registrationPage.email.fill(email);
    await registrationPage.password.fill(data.oldPassword);
    await registrationPage.repeatPassword.fill(data.oldPassword);
    await registrationPage.selectSecurityQuestion(data.securityQuestion);
    await registrationPage.securityAnswer.fill(data.securityAnswer);
  });
  await test.step('Step 10: Register', () => registrationPage.submit());
  await test.step('Expected 1: реєстрацію завершено', async () => {
    await expect(page.getByText(messages.registrationCompleted)).toBeVisible();
  });

  await test.step('Steps 11–13: увійти новим користувачем', () => loginPage.login(email, data.oldPassword));
  await test.step('Steps 14–16: Account → Privacy & Security → Change Password', () => nav.openChangePassword());
  await test.step('Steps 17–19: заповнити форму зміни пароля', async () => {
    await changePassword.current.fill(data.oldPassword);
    await changePassword.next.fill(data.newPassword);
    await changePassword.repeat.fill(data.newPassword);
  });
  await test.step('Step 20: Change', () => changePassword.changeButton.click());

  await test.step('Expected 2: пароль змінено', async () => {
    await expect(page.getByText(messages.passwordChanged)).toBeVisible();
  });
});
