import { Locator, Page, expect } from '@playwright/test';

export class RegistrationPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly repeatPassword: Locator;
  readonly securityQuestion: Locator;
  readonly securityAnswer: Locator;
  readonly registerButton: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByRole('textbox', { name: 'Email address field' });
    this.password = page.getByRole('textbox', { name: 'Field for the password' });
    this.repeatPassword = page.getByRole('textbox', { name: 'Field to confirm the password' });
    this.securityQuestion = page.getByRole('combobox', { name: 'Selection list for the security question' });
    this.securityAnswer = page.getByRole('textbox', { name: 'Field for the answer to the security question' });
    this.registerButton = page.getByRole('button', { name: 'Button to complete the registration' });
  }

  async selectSecurityQuestion(question: string) {
    await this.securityQuestion.click();
    await expect(this.page.getByRole('listbox')).toBeVisible();
    await this.page.getByRole('option', { name: question }).click();
  }

  async submit() {
    await this.registerButton.click();
    await expect(this.page).toHaveURL(/\/login/);
  }
}
