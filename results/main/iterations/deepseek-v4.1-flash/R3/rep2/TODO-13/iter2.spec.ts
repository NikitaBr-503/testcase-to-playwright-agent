import { test, expect } from '../../../../../support/fixtures';
test('TODO-13 Очищення виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();

  // The todo list lives inside <main>; the filter links (All/Active/Completed)
  // are a separate list outside of it, so scope the todo items to main.
  const todoItems = page.getByRole('main').getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

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
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .check();

  // Step 5
  await todoItems
    .filter({ hasText: 'Подзвонити керівнику' })
    .getByRole('checkbox')
    .check();

  // Step 6
  const clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  await expect(clearCompletedButton).toBeVisible();
  await clearCompletedButton.click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toHaveCount(0);

  // Expected 2
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
});
