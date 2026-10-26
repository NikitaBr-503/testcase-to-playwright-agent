```ts
import { test, expect } from '@playwright/test';

test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  const items = page.getByRole('main').getByRole('listitem');
  await expect(items).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  await expect(items.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');
  await expect(items.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(items.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(items).toHaveCount(3);

  // Step 4
  const toggleAll = page.getByRole('checkbox', { name: /Toggle All Input/ });
  await expect(toggleAll).toBeVisible();
  await toggleAll.click();

  // Expected 1
  await expect(items.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(items.nth(1).getByRole('checkbox')).toBeChecked();
  await expect(items.nth(2).getByRole('checkbox')).toBeChecked();

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```