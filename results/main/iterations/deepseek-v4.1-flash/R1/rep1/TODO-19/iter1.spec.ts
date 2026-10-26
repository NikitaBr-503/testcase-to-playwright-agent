import { test, expect } from '../../../../../support/fixtures';
test('TODO-19 Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodo = page.getByPlaceholder('What needs to be done?');
  const todoItem = (text: string) => page.getByRole('listitem').filter({ hasText: text });

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');
  await expect(todoItem('Купити молоко')).toBeVisible();

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');
  await expect(todoItem('Написати статтю')).toBeVisible();

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');
  await expect(todoItem('Подзвонити керівнику')).toBeVisible();

  // Step 4
  await todoItem('Купити молоко').getByRole('checkbox').check();
  await expect(todoItem('Купити молоко').getByRole('checkbox')).toBeChecked();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(todoItem('Купити молоко')).toHaveCount(0);
  await expect(todoItem('Написати статтю')).toBeVisible();
  await expect(todoItem('Подзвонити керівнику')).toBeVisible();

  // Step 6
  await todoItem('Подзвонити керівнику').getByText('Подзвонити керівнику').dblclick();
  const editInput = todoItem('Подзвонити керівнику').getByRole('textbox');
  await expect(editInput).toBeVisible();

  // Step 7
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');
  await expect(todoItem('Подзвонити науковому керівнику')).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику', { exact: true })).toHaveCount(0);

  // Step 9
  await todoItem('Подзвонити науковому керівнику').getByRole('checkbox').check();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(todoItem('Написати статтю')).toBeVisible();
  await expect(todoItem('Подзвонити науковому керівнику')).toHaveCount(0);

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(todoItem('Купити молоко')).toBeVisible();
  await expect(todoItem('Подзвонити науковому керівнику')).toBeVisible();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
