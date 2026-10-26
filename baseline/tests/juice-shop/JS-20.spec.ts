import { test, expect } from '../../fixtures';
import { juiceShop, price } from '../../helpers/data';

const user = juiceShop.users.registered;
const { appleJuice } = juiceShop.products;

test('JS-20 Зміна кількості товару в кошику', async ({ api, catalog, nav, loginPage, basket }) => {
  void api; // basket of the test user is empty
  await test.step('Step 1: відкрити головну сторінку', () => catalog.open());
  await test.step('Steps 2–6: увійти', async () => {
    await nav.goToLogin();
    await loginPage.login(user.email, user.password);
  });
  await test.step('Step 7: додати товар у кошик', async () => {
    await catalog.addToBasket(appleJuice.name);
    await expect(nav.basketButton).toContainText('1');
  });
  await test.step('Step 8: відкрити кошик', async () => {
    await nav.openBasket();
    await expect(basket.row(appleJuice.name)).toBeVisible();
  });

  await test.step('Step 9: збільшити кількість', () => basket.increase(appleJuice.name));
  await test.step('Expected 1: кількість 2, сума 3.98¤', async () => {
    await expect(basket.quantity(appleJuice.name)).toHaveText('2');
    await expect(basket.totalPrice).toHaveText(`Total Price: ${price(appleJuice.unitPrice * 2)}`);
  });

  await test.step('Step 10: зменшити кількість', () => basket.decrease(appleJuice.name));
  await test.step('Expected 2: кількість 1, сума 1.99¤', async () => {
    await expect(basket.quantity(appleJuice.name)).toHaveText('1');
    await expect(basket.totalPrice).toHaveText(`Total Price: ${price(appleJuice.unitPrice)}`);
  });
});
