```ts
import { test, expect } from '@playwright/test';

test('JS-14 Додавання відгуку до товару', async ({ page }) => {
  const reviewText = `Дуже смачно ${Date.now()}`;

  // Preconditions
  // The user qa_user@example.com is registered and not logged in; the welcome dialog and cookie banner are already dismissed.

  // Step 1
  await page.goto('/');

  // Step 2
  await page.getByRole('button', { name: /Account/ }).click();

  // Step 3
  await page.getByRole('menuitem', { name: /Login/ }).click();

  // Step 4
  await page.getByLabel(/^Email/).fill('qa_user@example.com');

  // Step 5
  await page.getByLabel(/^Password/).fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 7
  await page.getByText('Banana Juice (1000ml)').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Step 8
  await dialog.getByRole('textbox').fill(reviewText);

  // Step 9
  await dialog.getByRole('button', { name: /Submit/ }).click();

  // Expected 1
  await expect(page.getByText('You review has been saved.')).toBeVisible();

  // Expected 2
  const reviewsHeader = dialog.getByRole('button', { name: /Reviews/ });
  await expect(reviewsHeader).toBeVisible();
  if ((await reviewsHeader.getAttribute('aria-expanded')) !== 'true') {
    await reviewsHeader.click();
  }
  await expect(dialog.getByText(reviewText)).toBeVisible();
});
```