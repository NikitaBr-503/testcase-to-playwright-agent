import users from '../data/juice-shop/users.json';
import products from '../data/juice-shop/products.json';
import addresses from '../data/juice-shop/addresses.json';
import messages from '../data/juice-shop/messages.json';
import todos from '../data/todomvc/todos.json';

export const juiceShop = { users, products, addresses, messages };
export { todos };

/** Replace {key} placeholders in a message template. */
export const format = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);

/** Unique e-mail for tests that register a new user. */
export const uniqueEmail = (prefix: string, domain: string) =>
  `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}@${domain}`;

/** Juice Shop price label, e.g. 3.98 -> "3.98¤". */
export const price = (value: number) => `${value.toFixed(2)}¤`;
