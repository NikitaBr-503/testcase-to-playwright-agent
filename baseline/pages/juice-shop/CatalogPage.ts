import { Locator, Page } from '@playwright/test';

/** Product grid on the start page and on the search results page. */
export class CatalogPage {
  readonly productCards: Locator;
  readonly productDialog: Locator;

  constructor(private readonly page: Page) {
    this.productCards = page.locator('mat-card')
      .filter({ has: page.getByRole('button', { name: 'Click for more information about the product' }) });
    this.productDialog = page.getByRole('dialog');
  }

  async open() {
    await this.page.goto('/');
  }

  card(productName: string): Locator {
    return this.page.locator('mat-card').filter({ hasText: productName });
  }

  async openProduct(productName: string) {
    await this.page.getByRole('button', { name: 'Click for more information about the product' })
      .filter({ hasText: productName }).click();
  }

  async addToBasket(productName: string) {
    await this.card(productName).getByRole('button', { name: 'Add to Basket' }).click();
  }

  message(text: string): Locator {
    return this.page.getByText(text);
  }
}
