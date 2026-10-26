import { test, expect } from '../../fixtures';
import { juiceShop } from '../../helpers/data';

const user = juiceShop.users.registered;

test('JS-17 Вихід із системи', async ({ api, catalog, nav, loginPage }) => {
  void api; // resets the test user's state
  await test.step('Step 1: відкрити головну сторінку', () => catalog.open());
  await test.step('Steps 2–3: Account → Login', () => nav.goToLogin());
  await test.step('Steps 4–6: увійти', () => loginPage.login(user.email, user.password));
  await test.step('Steps 7–8: Account → Logout', () => nav.logout());
  await test.step('Step 9: відкрити меню Account', () => nav.openAccountMenu());

  await test.step('Expected 1: у меню є пункт «Login»', async () => {
    await expect(nav.loginItem).toBeVisible();
  });
  await test.step('Expected 2: у меню немає адреси користувача', async () => {
    await expect(nav.accountMenu).toBeVisible();
    await expect(nav.accountMenu.getByText(user.email)).toHaveCount(0);
    await expect(nav.logoutItem).toHaveCount(0);
  });
});
