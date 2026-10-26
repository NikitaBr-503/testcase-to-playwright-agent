import { test, expect } from '../../../../../support/fixtures';
test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });
  const toggleAll = page.locator('.toggle-all');

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
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await toggleAll.click();
  await expect(todoItems.filter({ hasText: 'Купити молоко' }).getByRole('checkbox')).toBeChecked();

  // Step 5
  const articleTodo = todoItems.filter({ hasText: 'Написати статтю' });
  await articleTodo.getByRole('checkbox').click();
  await expect(articleTodo.getByRole('checkbox')).not.toBeChecked();

  // Step 6
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);

  // Step 8
  await toggleAll.click();
  await expect(todoItems.filter({ hasText: 'Підготувати презентацію' }).getByRole('checkbox')).toBeChecked();

  // Step 9
  await page.getByText('Completed', { exact: true }).click();
  await expect(todoItems).toHaveCount(2);

  // Step 10
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(page.getByText(/items? left/)).toBeHidden();
  await expect(page.getByText('All', { exact: true })).toBeHidden();
  await expect(page.getByText('Active', { exact: true })).toBeHidden();
  await expect(page.getByText('Completed', { exact: true })).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');

  // Step 12
  await page.getByText('All', { exact: true }).click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Купити хліб');
  await expect(page.getByText('1 item left')).toBeVisible();
});
