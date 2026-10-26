```ts
import { test, expect } from '@playwright/test';

test('TODO-11 Фільтр виконаних завдань', async ({ page }) => {
  // Preconditions
  // Список завдань порожній (застосунок не зберігає завдання між запусками)
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // The todo list lives inside <main>; the filter links are a separate list
  // outside of it, so scope the listitem locator to the main region.
  const todoList = page.getByRole('main').getByRole('list');
  const todoItems = todoList.getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  await expect(todoItems).toHaveCount(3);
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  await todoItems
    .filter({ hasText: 'Написати статтю' })
    .getByRole('checkbox')
    .check();

  // Step 5
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 1
  // Відображається лише завдання «Написати статтю».
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toHaveCount(0);

  // Expected 2
  // Адреса сторінки закінчується на «#/completed».
  await expect(page).toHaveURL(/#\/completed$/);
});
```