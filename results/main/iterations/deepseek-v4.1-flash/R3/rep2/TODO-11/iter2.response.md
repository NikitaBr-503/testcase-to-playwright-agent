```ts
import { test, expect } from '@playwright/test';

test('TODO-11 Фільтр виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // The todo items live inside the main landmark; the filter links also use
  // list items, so scope the locator to the main region.
  const todoItems = page.getByRole('main').getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(1);

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(3);
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  const articleTodo = todoItems.filter({ hasText: 'Написати статтю' });
  await expect(articleTodo).toBeVisible();
  const articleCheckbox = articleTodo.getByRole('checkbox');
  await articleCheckbox.check();
  await expect(articleCheckbox).toBeChecked();

  // Step 5
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/completed$/);
});
```