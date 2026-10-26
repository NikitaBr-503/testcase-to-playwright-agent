```ts
import { test, expect } from '@playwright/test';

test('JS-14 Додавання відгуку до товару', async ({ page }) => {
  const reviewText = `Дуже смачно ${Date.now()}`;

  // Preconditions
  // Welcome dialog and cookie banner are already dismissed by the test environment.
  // User qa_user@example.com is registered and is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible();

  // Step 2
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();

  // Step 3
  await page.getByRole('menuitem', { name: 'Go to login page' }).click();
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();

  // Step 4
  await page.getByLabel('Email').fill('qa_user@example.com');

  // Step 5
  await page.getByLabel('Password').fill('QaPassword123!');

  // Step 6
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toContainText('Account');

  // Step 7
  await page
    .getByRole('button', { name: 'Click for more information about the product' })
    .filter({ hasText: 'Banana Juice (1000ml)' })
    .click();
  await expect(page.getByLabel('Review')).toBeVisible();

  // Step 8
  await page.getByLabel('Review').fill(reviewText);

  // Step 9
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expected 1
  await expect(page.getByText('You review has been saved.')).toBeVisible();

  // Expected 2
  await expect(page.getByText(reviewText)).toBeVisible();
});
```