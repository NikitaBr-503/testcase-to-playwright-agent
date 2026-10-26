import { test, expect } from '../../fixtures';
import { juiceShop, format } from '../../helpers/data';

const user = juiceShop.users.registered;
const address = juiceShop.addresses.kyiv;

test('JS-21 Додавання нової адреси доставки', async ({ api, catalog, nav, loginPage, addresses, page }) => {
  void api; // the test user has no saved addresses
  await test.step('Step 1: відкрити головну сторінку', () => catalog.open());
  await test.step('Steps 2–6: увійти', async () => {
    await nav.goToLogin();
    await loginPage.login(user.email, user.password);
  });
  await test.step('Steps 7–9: Account → Orders & Payment → My saved addresses', () => nav.openSavedAddresses());
  await test.step('Step 10: Add New Address', () => addresses.addButton.click());
  await test.step('Steps 11–17: заповнити форму', () => addresses.fill(address));
  await test.step('Step 18: Submit', () => addresses.submitButton.click());

  await test.step('Expected 1: повідомлення про додану адресу', async () => {
    await expect(page.getByText(format(juiceShop.messages.addressAdded, { city: address.city }))).toBeVisible();
  });
  await test.step('Expected 2: адреса у списку збережених', async () => {
    await expect(page).toHaveURL(/\/address\/saved/);
    const saved = addresses.savedAddress(address.name);
    await expect(saved).toHaveCount(1);
    await expect(saved).toContainText(address.city);
  });
});
