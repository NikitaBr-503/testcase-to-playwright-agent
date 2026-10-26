```ts
import { test, expect } from '@playwright/test';

test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // The todo list lives inside the "main" landmark; the filter links are a separate list
  // outside of it, so scope the list items to "main" to avoid matching the filters.
  const todoItems = page.getByRole('main').getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // The "mark all as complete" control is the checkbox labelled "Toggle All Input"
  // (the visible arrow is its label, but the checkbox itself receives the pointer events).
  const toggleAll = page.getByRole('checkbox', { name: /Toggle All Input/ });
  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });

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
  await toggleAll.check();
  await expect(todoItems.filter({ hasText: 'Купити молоко' }).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.filter({ hasText: 'Написати статтю' }).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' }).getByRole('checkbox')).toBeChecked();

  // Step 5
  const articleTodo = todoItems.filter({ hasText: 'Написати статтю' });
  await articleTodo.getByRole('checkbox').click();
  await expect(articleTodo.getByRole('checkbox')).not.toBeChecked();

  // Step 6
  await clearCompleted.click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toHaveText(['Написати статтю']);

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Підготувати презентацію' })).toBeVisible();

  // Step 8
  await toggleAll.check();
  await expect(articleTodo.getByRole('checkbox')).toBeChecked();
  await expect(todoItems.filter({ hasText: 'Підготувати презентацію' }).getByRole('checkbox')).toBeChecked();

  // Step 9
  await page.getByRole('link', { name: 'Completed', exact: true }).click();
  await expect(todoItems).toHaveCount(2);

  // Step 10
  await clearCompleted.click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'All', exact: true })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active', exact: true })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed', exact: true })).toBeHidden();
  await expect(clearCompleted).toBeHidden();
  await expect(page.getByText(/item left/)).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');
  await expect(newTodoInput).toHaveValue('');

  // Step 12
  await page.getByRole('link', { name: 'All', exact: true }).click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toHaveText(['Купити хліб']);
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```