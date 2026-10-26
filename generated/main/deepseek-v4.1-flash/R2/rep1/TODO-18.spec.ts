import { test, expect } from '../../../../../support/fixtures';
test('TODO-18 Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  const todoList = page.locator('.todo-list');
  const todoItems = todoList.getByRole('listitem');
  await expect(newTodoInput).toBeVisible();
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(1);

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await newTodoInput.fill('Забронювати квиток');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(4);

  // Step 5
  const milkTodo = todoItems.filter({ hasText: 'Купити молоко' });
  await milkTodo.getByRole('checkbox').check();
  await expect(milkTodo.getByRole('checkbox')).toBeChecked();

  // Step 6
  const ticketTodo = todoItems.filter({ hasText: 'Забронювати квиток' });
  await ticketTodo.getByRole('checkbox').check();
  await expect(ticketTodo.getByRole('checkbox')).toBeChecked();

  // Step 7
  const articleTodo = todoItems.filter({ hasText: 'Написати статтю' });
  await articleTodo.getByText('Написати статтю', { exact: true }).dblclick();

  // Step 8
  const editInput = page.locator('input.edit:visible');
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');
  await expect(page.getByText('Написати статтю для Scopus')).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Написати статтю для Scopus' })).toHaveCount(1);

  // Step 10
  const activeFilter = page
    .getByRole('link', { name: 'Active' })
    .or(page.getByRole('button', { name: 'Active' }));
  await activeFilter.click();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Написати статтю для Scopus' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(todoItems.filter({ hasText: 'Забронювати квиток' })).toHaveCount(0);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(todoItems.filter({ hasText: 'Забронювати квиток' })).toHaveCount(0);

  // Step 12
  const allFilter = page
    .getByRole('link', { name: 'All', exact: true })
    .or(page.getByRole('button', { name: 'All', exact: true }));
  await allFilter.click();

  // Expected 2
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Написати статтю для Scopus' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(todoItems.filter({ hasText: 'Забронювати квиток' })).toHaveCount(0);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
