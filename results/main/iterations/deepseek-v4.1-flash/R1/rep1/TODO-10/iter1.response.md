```ts
import { test, expect } from '@playwright/test';

test('TODO-10: Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(0);
  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  // Step 4
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Написати статтю' })
    .getByRole('checkbox')
    .check();

  // Step 5
  const activeFilter = page.getByRole('link', { name: 'Active', exact: true });
  await activeFilter.click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(activeFilter).toHaveClass(/selected/);
});
```