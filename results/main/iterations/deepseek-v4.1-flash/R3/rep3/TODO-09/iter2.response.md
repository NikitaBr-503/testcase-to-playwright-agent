```ts
import { test, expect } from '@playwright/test';

test('TODO-09 Видалення завдання через очищення тексту під час редагування', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // Scope todo items to the main list so the footer filter links are not counted
  const todoItems = page.getByRole('main').getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);

  const milkItem = todoItems.filter({ hasText: 'Купити молоко' });

  // Step 3
  await milkItem.getByText('Купити молоко').dblclick();

  // Step 4
  const editInput = page.getByRole('main').getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('');

  // Step 5
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(todoItems).toHaveCount(1);

  // Expected 2
  await expect(todoItems).toHaveText('Написати статтю');
  await expect(page.getByText('1 item left!', { exact: true })).toBeVisible();
});
```