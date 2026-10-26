```ts
import { test, expect } from '@playwright/test';

test('TODO-13 Очищення виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await expect(newTodoInput).toBeVisible();
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

  const todoItems = page.getByRole('listitem');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await todoItems
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .click();

  // Step 5
  await todoItems
    .filter({ hasText: 'Подзвонити керівнику' })
    .getByRole('checkbox')
    .click();

  // Step 6
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toHaveText('Написати статтю');
  await expect(
    todoItems.filter({ hasText: 'Купити молоко' })
  ).toHaveCount(0);
  await expect(
    todoItems.filter({ hasText: 'Подзвонити керівнику' })
  ).toHaveCount(0);

  // Expected 2
  await expect(
    page.getByRole('button', { name: 'Clear completed' })
  ).toBeHidden();
});
```