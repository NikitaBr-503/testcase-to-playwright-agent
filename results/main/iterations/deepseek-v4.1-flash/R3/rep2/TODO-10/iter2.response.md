```ts
import { test, expect } from '@playwright/test';

test('TODO-10: Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  // Список завдань порожній (застосунок не зберігає завдання між запусками)
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // The todo list lives inside <main>; the filter links are also list items,
  // so scope the todo items to the main region.
  const todoItems = page.getByRole('main').getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await todoItems
    .filter({ hasText: 'Написати статтю' })
    .getByRole('checkbox')
    .check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeHidden();

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(page.getByRole('link', { name: 'Active' })).toHaveClass(/selected/);
});
```