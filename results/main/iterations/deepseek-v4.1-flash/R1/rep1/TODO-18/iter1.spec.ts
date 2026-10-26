import { test, expect } from '../../../../../support/fixtures';
test('TODO-18 Повний сценарій роботи зі списком', async ({ page }) => {
  const todoList = page.locator('.todo-list');
  const visibleItems = page.locator('.todo-list li:visible');
  const todoItem = (title: string) => todoList.locator('li').filter({ hasText: title });

  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(todoList.locator('li')).toHaveCount(0);

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
  await newTodoInput.fill('Забронювати квиток');
  await newTodoInput.press('Enter');
  await expect(todoList.locator('li')).toHaveCount(4);

  // Step 5
  await todoItem('Купити молоко').getByRole('checkbox').check();

  // Step 6
  await todoItem('Забронювати квиток').getByRole('checkbox').check();

  // Step 7
  await page.getByText('Написати статтю', { exact: true }).dblclick();

  // Step 8
  const editInput = todoList.getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();

  // Step 10
  await page.getByText('Active', { exact: true }).click();

  // Expected 1
  await expect(visibleItems).toHaveCount(2);
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику', { exact: true })).toBeVisible();
  await expect(page.getByText('Купити молоко', { exact: true })).toBeHidden();
  await expect(page.getByText('Забронювати квиток', { exact: true })).toBeHidden();

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByText('All', { exact: true }).click();

  // Expected 2
  await expect(visibleItems).toHaveCount(2);
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику', { exact: true })).toBeVisible();
  await expect(page.getByText('Купити молоко', { exact: true })).toBeHidden();
  await expect(page.getByText('Забронювати квиток', { exact: true })).toBeHidden();
  await expect(page.getByText('2 items left!', { exact: true })).toBeVisible();
});
