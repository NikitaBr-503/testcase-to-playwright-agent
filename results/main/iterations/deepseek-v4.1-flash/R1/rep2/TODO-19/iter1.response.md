```ts
import { test, expect } from '@playwright/test';

test('TODO-19: Редагування завдання у фільтрі «Active»', async ({ page }) => {
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItem = (text: string) => page.getByRole('listitem').filter({ hasText: text });

  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItem('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItem('Написати статтю')).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItem('Подзвонити керівнику')).toBeVisible();

  // Step 4
  await todoItem('Купити молоко').getByRole('checkbox').click();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  await todoItem('Подзвонити керівнику').getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = todoItem('Подзвонити керівнику').getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');

  // Step 9
  await todoItem('Подзвонити науковому керівнику').getByRole('checkbox').click();

  // Expected 1
  await expect(todoItem('Написати статтю')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(1);

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(todoItem('Купити молоко')).toBeVisible();
  await expect(todoItem('Подзвонити науковому керівнику')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(2);

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```