```ts
import { test, expect } from '@playwright/test';

test('TODO-19 Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // The todo list lives inside <main>; the filter links are also list items,
  // so all list-item lookups are scoped to <main>.
  const todoItems = page.getByRole('main').getByRole('listitem');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  const milkItem = todoItems.filter({ hasText: 'Купити молоко' });
  await milkItem.getByRole('checkbox').check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(todoItems).toHaveCount(2);

  // Step 6
  const callItem = todoItems.filter({ hasText: 'Подзвонити керівнику' });
  await callItem.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = callItem.getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');
  await expect(page.getByText('Подзвонити науковому керівнику')).toBeVisible();

  // Step 9
  // The item leaves the "Active" list as soon as it is toggled, so the checkbox
  // element is detached from the DOM right after the click. Using click() instead
  // of check() avoids waiting for a checkbox that no longer exists.
  const renamedItem = todoItems.filter({ hasText: 'Подзвонити науковому керівнику' });
  await renamedItem.getByRole('checkbox').click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByText('Купити молоко')).toBeHidden();
  await expect(page.getByText('Подзвонити науковому керівнику')).toBeHidden();

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(2);
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByText('Подзвонити науковому керівнику')).toBeVisible();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```