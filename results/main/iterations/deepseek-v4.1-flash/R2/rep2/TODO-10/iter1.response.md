```ts
import { test, expect } from '@playwright/test';

test('TODO-10: Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  // Список завдань порожній (застосунок не зберігає завдання між запусками)
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
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

  const milkTodo = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  const callTodo = page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' });

  await expect(milkTodo).toBeVisible();
  await expect(articleTodo).toBeVisible();
  await expect(callTodo).toBeVisible();

  // Step 4
  await articleTodo.getByRole('checkbox').click();

  // Step 5
  const activeFilter = page.getByRole('link', { name: 'Active' });
  await activeFilter.click();

  // Expected 1
  await expect(milkTodo).toBeVisible();
  await expect(callTodo).toBeVisible();
  await expect(articleTodo).toBeHidden();

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(activeFilter).toHaveClass(/selected/);
});
```