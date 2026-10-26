```ts
import { test, expect } from '@playwright/test';

test('TODO-10 Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');

  // Step 4
  const articleItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').check();
  await expect(articleItem.getByRole('checkbox')).toBeChecked();

  // Step 5
  const activeFilter = page.getByRole('link', { name: 'Active' });
  await activeFilter.click();

  // Expected 1
  const items = page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });
  await expect(items).toHaveCount(2);
  await expect(items.filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(items.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(page.getByText('Написати статтю')).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(activeFilter).toHaveClass(/selected/);
});
```