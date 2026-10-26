```ts
import { test, expect } from '@playwright/test';

test('TODO-10 Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByText('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await page.getByPlaceholder('What needs to be done?').fill('Купити молоко');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Step 2
  await page.getByPlaceholder('What needs to be done?').fill('Написати статтю');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Step 3
  await page.getByPlaceholder('What needs to be done?').fill('Подзвонити керівнику');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Step 4
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Написати статтю' })
    .getByRole('checkbox')
    .click();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Купити молоко' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Написати статтю' })
  ).toHaveCount(0);
  await expect(page.getByRole('listitem')).toHaveCount(2);

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(page.getByRole('link', { name: 'Active' })).toHaveClass(/selected/);
});
```