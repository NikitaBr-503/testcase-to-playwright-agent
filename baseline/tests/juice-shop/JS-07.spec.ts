import { test, expect } from '../../fixtures';
import { juiceShop } from '../../helpers/data';

const { bananaJuice } = juiceShop.products;

test('JS-07 Перегляд картки товару', async ({ catalog }) => {
  await test.step('Step 1: відкрити головну сторінку', () => catalog.open());
  await test.step('Step 2: відкрити товар', () => catalog.openProduct(bananaJuice.name));

  await test.step('Expected 1: вікно з заголовком товару', async () => {
    await expect(catalog.productDialog).toBeVisible();
    await expect(catalog.productDialog.getByRole('heading', { name: bananaJuice.name })).toBeVisible();
  });
  await test.step('Expected 2: ціна і розділ «Reviews»', async () => {
    await expect(catalog.productDialog.getByText(bananaJuice.price)).toBeVisible();
    await expect(catalog.productDialog.getByText('Reviews')).toBeVisible();
  });
});
