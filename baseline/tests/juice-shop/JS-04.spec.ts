import { test, expect } from '../../fixtures';
import { juiceShop } from '../../helpers/data';

const { products, messages } = juiceShop;

test('JS-04 Пошук товару, якого немає в каталозі', async ({ catalog, nav }) => {
  await test.step('Step 1: відкрити головну сторінку', () => catalog.open());
  await test.step('Steps 2–3: пошук «zzzz»', () => nav.search(products.missingSearchTerm));

  await test.step('Expected 1: повідомлення «No results found»', async () => {
    await expect(catalog.message(messages.noResults)).toBeVisible();
  });
  await test.step('Expected 2: жодної картки товару', async () => {
    await expect(catalog.productCards).toHaveCount(0);
  });
});
