import { test, expect } from '../../../../../support/fixtures';
test('TODO-19: Редагування завдання у фільтрі «Active»', async ({ page }) => {
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItem = (text: string) =>
    page.getByRole('listitem').filter({ hasText: text });

  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

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
  await todoItem('Купити молоко').getByRole('checkbox').check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  await todoItem('Подзвонити керівнику')
    .getByText('Подзвонити керівнику', { exact: true })
    .dblclick();

  // Step 7
  const editInput = todoItem('Подзвонити керівнику').getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');
  await expect(
    todoItem('Подзвонити науковому керівнику').getByText('Подзвонити науковому керівнику', { exact: true })
  ).toBeVisible();

  // Step 9
  await todoItem('Подзвонити науковому керівнику').getByRole('checkbox').check();

  // Expected 1
  const activeItems = page.getByRole('listitem');
  await expect(activeItems).toHaveCount(1);
  await expect(activeItems.first()).toContainText('Написати статтю');
  await expect(page.getByText('Подзвонити науковому керівнику')).toBeHidden();
  await expect(page.getByText('Купити молоко')).toBeHidden();

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  const completedItems = page.getByRole('listitem');
  await expect(completedItems).toHaveCount(2);
  await expect(todoItem('Купити молоко')).toBeVisible();
  await expect(todoItem('Подзвонити науковому керівнику')).toBeVisible();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(3);
});
