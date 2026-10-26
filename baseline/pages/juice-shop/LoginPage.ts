import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByRole('textbox', { name: 'Text field for the login email' });
    this.password = page.getByRole('textbox', { name: 'Text field for the login password' });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.registerLink = page.getByRole('link', { name: 'Not yet a customer?' });
  }

  async fillEmail(email: string) { await this.email.fill(email); }
  async fillPassword(password: string) { await this.password.fill(password); }

  async submit() {
    await this.loginButton.click();
    await expect(this.page).not.toHaveURL(/\/login/);
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }
}
