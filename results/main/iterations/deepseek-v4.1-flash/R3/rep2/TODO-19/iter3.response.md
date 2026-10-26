```ts
import { test, expect } from '@playwright/test';

test('TODO-19 Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await expect(newTodoInput).toBeVisible();

  const todoList = page.getByRole('main').getByRole('listitem');
  const milkItem = todoList.filter({ hasText: 'Купити молоко' });
  const articleItem = todoList.filter({ hasText: 'Написати статтю' });
  const chiefItem = todoList.filter({ hasText: 'Подзвонити керівнику' });

  await expect(todoList).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(milkItem).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(articleItem).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoList).toHaveCount(3);

  // Step 4
  await milkItem.getByRole('checkbox').click();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page).toHaveURL(/#\/active$/);
  await expect(todoList).toHaveCount(2);
  await expect(chiefItem).toBeVisible();

  // Step 6
  await chiefItem.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = page.locator('li.editing input.edit');
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');
  const renamedItem = todoList.filter({ hasText: 'Подзвонити науковому керівнику' });
  await expect(renamedItem).toBeVisible();

  // Step 9
  await renamedItem.getByRole('checkbox').click();

  // Expected 1
  await expect(todoList).toHaveCount(1);
  await expect(articleItem).toBeVisible();
  await expect(todoList.filter({ hasText: 'Подзвонити' })).toHaveCount(0);

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page).toHaveURL(/#\/completed$/);

  // Expected 2
  await expect(todoList).toHaveCount(2);
  await expect(milkItem).toBeVisible();
  await expect(renamedItem).toBeVisible();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();
  await expect(page).toHaveURL(/#\/$/);

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```