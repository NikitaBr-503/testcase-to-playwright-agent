import { Locator, Page } from '@playwright/test';

/** Top toolbar of Juice Shop: account menu, search and basket. */
export class NavBar {
  readonly accountButton: Locator;
  readonly searchButton: Locator;
  readonly searchField: Locator;
  readonly basketButton: Locator;

  constructor(private readonly page: Page) {
    this.accountButton = page.getByRole('button', { name: 'Show/hide account menu' });
    this.searchButton = page.getByRole('button', { name: 'Open search' });
    this.searchField = page.locator('#searchQuery').getByRole('textbox');
    this.basketButton = page.getByRole('button', { name: 'Show the shopping cart' });
  }

  menuItem(name: string | RegExp): Locator {
    return this.page.getByRole('menuitem', { name });
  }

  /** Open account menu panel (contains the user's e-mail when logged in). */
  get accountMenu(): Locator {
    return this.page.getByRole('menu');
  }

  get loginItem() { return this.menuItem('Go to login page'); }
  get logoutItem() { return this.menuItem('Logout'); }
  get ordersAndPaymentItem() { return this.menuItem('Show Orders and Payment Menu'); }
  get savedAddressesItem() { return this.menuItem('Go to saved address page'); }
  get privacyAndSecurityItem() { return this.menuItem('Show Privacy and Security Menu'); }
  get changePasswordItem() { return this.menuItem('Change Password'); }

  async openAccountMenu() {
    await this.accountButton.click();
  }

  async goToLogin() {
    await this.openAccountMenu();
    await this.loginItem.click();
  }

  async logout() {
    await this.openAccountMenu();
    await this.logoutItem.click();
  }

  async search(term: string) {
    await this.searchButton.click();
    await this.searchField.fill(term);
    await this.searchField.press('Enter');
  }

  async openBasket() {
    await this.basketButton.click();
  }

  async openSavedAddresses() {
    await this.openAccountMenu();
    await this.ordersAndPaymentItem.click();
    await this.savedAddressesItem.click();
  }

  async openChangePassword() {
    await this.openAccountMenu();
    await this.privacyAndSecurityItem.click();
    await this.changePasswordItem.click();
  }
}
