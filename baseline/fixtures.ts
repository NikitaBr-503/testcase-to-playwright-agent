import { test as base, expect } from '@playwright/test';
import { NavBar } from './pages/juice-shop/NavBar';
import { LoginPage } from './pages/juice-shop/LoginPage';
import { RegistrationPage } from './pages/juice-shop/RegistrationPage';
import { CatalogPage } from './pages/juice-shop/CatalogPage';
import { BasketPage } from './pages/juice-shop/BasketPage';
import { AddressPage } from './pages/juice-shop/AddressPage';
import { ChangePasswordPage } from './pages/juice-shop/ChangePasswordPage';
import { TodoPage } from './pages/todomvc/TodoPage';
import { JuiceShopApi } from './helpers/juice-shop-api';

type Pages = {
  api: JuiceShopApi;
  nav: NavBar;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  catalog: CatalogPage;
  basket: BasketPage;
  addresses: AddressPage;
  changePassword: ChangePasswordPage;
  todo: TodoPage;
};

/**
 * Juice Shop tests: the welcome dialog and cookie banner are dismissed (same environment set-up as
 * the agent, config/experiment.yaml, init_cookies), and the test user's state is reset through the API.
 */
export const test = base.extend<Pages>({
  context: async ({ context, baseURL }, use, testInfo) => {
    if (testInfo.project.name === 'juice-shop' && baseURL) {
      await context.addCookies(['welcomebanner_status', 'cookieconsent_status']
        .map((name) => ({ name, value: 'dismiss', url: baseURL })));
    }
    await use(context);
  },
  api: async ({ request }, use) => {
    const api = new JuiceShopApi(request);
    await api.resetUserState();
    await use(api);
  },
  nav: async ({ page }, use) => use(new NavBar(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registrationPage: async ({ page }, use) => use(new RegistrationPage(page)),
  catalog: async ({ page }, use) => use(new CatalogPage(page)),
  basket: async ({ page }, use) => use(new BasketPage(page)),
  addresses: async ({ page }, use) => use(new AddressPage(page)),
  changePassword: async ({ page }, use) => use(new ChangePasswordPage(page)),
  todo: async ({ page }, use) => use(new TodoPage(page)),
});

export { expect };
