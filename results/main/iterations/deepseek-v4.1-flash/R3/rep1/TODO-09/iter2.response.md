```ts
import { test, expect } from '@playwright/test';

test('TODO-09 Видалення завдання через очищення тексту під час редагування', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  const todoList = page.getByRole('main').getByRole('list');
  await expect(todoList.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  const milkItem = todoList.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(milkItem).toBeVisible();
  await expect(todoList.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await milkItem.getByText('Купити молоко', { exact: true }).dblclick();

  // Step 4
  const editInput = milkItem.getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('');

  // Step 5
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Купити молоко')).toHaveCount(0);

  // Expected 2
  await expect(todoList.getByRole('listitem')).toHaveCount(1);
  await expect(todoList.getByRole('listitem')).toHaveText('Написати статтю');
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```