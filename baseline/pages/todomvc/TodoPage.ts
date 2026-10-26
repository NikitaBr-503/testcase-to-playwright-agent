import { Locator, Page } from '@playwright/test';

export type Filter = 'All' | 'Active' | 'Completed';

/** TodoMVC (React): input, list, footer with counter, filters and "Clear completed". */
export class TodoPage {
  readonly newTodo: Locator;
  readonly items: Locator;
  readonly toggleAll: Locator;
  readonly footer: Locator;
  readonly counter: Locator;
  readonly clearCompleted: Locator;

  constructor(private readonly page: Page) {
    this.newTodo = page.getByPlaceholder('What needs to be done?');
    this.items = page.getByTestId('todo-item');
    this.toggleAll = page.getByTestId('toggle-all');
    this.footer = page.getByTestId('footer');
    this.counter = this.footer.locator('.todo-count');
    this.clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  }

  async open() {
    await this.page.goto('/');
  }

  async add(text: string) {
    await this.newTodo.fill(text);
    await this.newTodo.press('Enter');
  }

  item(text: string): Locator {
    return this.items.filter({ hasText: text });
  }

  async toggle(text: string) {
    await this.item(text).getByTestId('todo-item-toggle').click();
  }

  async remove(text: string) {
    await this.item(text).hover();
    await this.item(text).getByRole('button', { name: 'Delete todo' }).click();
  }

  filter(name: Filter): Locator {
    return this.page.getByRole('link', { name, exact: true });
  }

  async showFilter(name: Filter) {
    await this.filter(name).click();
  }
}
