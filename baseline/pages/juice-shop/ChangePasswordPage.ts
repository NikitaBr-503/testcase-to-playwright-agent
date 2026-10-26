import { Locator, Page } from '@playwright/test';

export class ChangePasswordPage {
  readonly current: Locator;
  readonly next: Locator;
  readonly repeat: Locator;
  readonly changeButton: Locator;

  constructor(page: Page) {
    this.current = page.getByRole('textbox', { name: 'Field to enter the current password' });
    this.next = page.getByRole('textbox', { name: 'Field for the new password' });
    this.repeat = page.getByRole('textbox', { name: 'Field to repeat the new password' });
    this.changeButton = page.getByRole('button', { name: 'Button to confirm the change' });
  }
}
