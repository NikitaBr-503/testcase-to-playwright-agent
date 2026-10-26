```ts
import { test, expect } from '@playwright/test';

test('TODO-19: Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.getByRole('listitem');
  await expect(newTodo).toBeVisible();
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await todoItems
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  await todoItems
    .filter({ hasText: 'Подзвонити керівнику' })
    .getByText('Подзвонити керівнику')
    .dblclick();

  // Step 7
  const editingInput = page.locator('li.editing').getByRole('textbox');
  await expect(editingInput).toBeVisible();
  await editingInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editingInput.press('Enter');

  // Step 9
  await todoItems
    .filter({ hasText: 'Подзвонити науковому керівнику' })
    .getByRole('checkbox')
    .check();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Написати статтю');

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(
    todoItems.filter({ hasText: 'Подзвонити науковому керівнику' })
  ).toBeVisible();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```