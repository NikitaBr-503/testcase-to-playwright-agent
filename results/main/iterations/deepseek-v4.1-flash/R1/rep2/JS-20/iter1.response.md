```ts
import { test, expect } from '@playwright/test';

test('JS-20 Зміна кількості товару в кошику', async ({ page, request }) => {
  // Preconditions
  // The welcome dialog and the cookie banner are already dismissed by the test environment.
  // The user qa_user@example.com is registered - make sure the basket is empty before the run.
  const apiLoginResponse = await request.post('/rest/user/login', {
    data: { email: 'qa_user@example.com', password: 'QaPassword123!' },
  });
  expect(apiLoginResponse.ok()).toBeTruthy();
  const { authentication } = await apiLoginResponse.json();
  const basketResponse = await request.get(`/rest/basket/${authentication.bid}`, {
    headers: { Authorization: `Bearer ${authentication.token}` },
  });
  const basket = await basketResponse.json();
  for (const product of basket.data.Products ?? []) {
    await request.delete(`/api/BasketItems/${product.BasketItem.id}`, {
      headers: { Authorization: `Bearer ${authentication.token}` },
    });
  }

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: 'Account' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  const appleJuiceCard = page.locator('mat-card').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(appleJuiceCard).toBeVisible();
  await appleJuiceCard.getByRole('button', { name: 'Add to Basket' }).click();

  // Step 8
  await page.getByRole('button', { name: /your basket|shopping cart/i }).click();

  // Step 9
  const basketRow = page.getByRole('row').filter({ hasText: 'Apple Juice (1000ml)' });
  await expect(basketRow).toBeVisible();
  await basketRow.getByRole('button', { name: /increase|\+/i }).click();

  // Expected 1
  await expect(basketRow.getByText('2', { exact: true })).toBeVisible();
  await expect(page.getByText('Total Price: 3.98¤')).toBeVisible();

  // Step 10
  await basketRow.getByRole('button', { name: /decrease|−|-/i }).click();

  // Expected 2
  await expect(basketRow.getByText('1', { exact: true })).toBeVisible();
  await expect(page.getByText('Total Price: 1.99¤')).toBeVisible();
});
```