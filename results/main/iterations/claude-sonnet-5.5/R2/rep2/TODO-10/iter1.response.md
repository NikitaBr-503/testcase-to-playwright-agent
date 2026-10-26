```ts
import { test, expect } from '@playwright/test';

test('TODO-10: Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const input = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(page.getByTestId('todo-item')).toHaveCount(3);

  // Step 4
  await page
    .getByTestId('todo-item')
    .filter({ hasText: 'Написати статтю' })
    .getByRole('checkbox')
    .check();

  // Step 5
  const activeFilter = page.getByRole('link', { name: 'Active' });
  await activeFilter.click();

  // Expected 1
  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(2);
  await expect(items.filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(items.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(page.getByText('Написати статтю')).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(activeFilter).toHaveClass(/selected/);
});
```