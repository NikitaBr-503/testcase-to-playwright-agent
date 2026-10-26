import { Locator, Page } from '@playwright/test';

export class BasketPage {
  readonly totalPrice: Locator;

  constructor(private readonly page: Page) {
    this.totalPrice = page.locator('#price');
  }

  row(productName: string): Locator {
    return this.page.getByRole('row').filter({ hasText: productName });
  }

  quantity(productName: string): Locator {
    return this.row(productName).getByRole('cell').nth(2);
  }

  async increase(productName: string) {
    await this.row(productName).locator('button').filter({ has: this.page.locator('svg[data-icon="plus-square"]') }).click();
  }

  async decrease(productName: string) {
    await this.row(productName).locator('button').filter({ has: this.page.locator('svg[data-icon="minus-square"]') }).click();
  }
}
