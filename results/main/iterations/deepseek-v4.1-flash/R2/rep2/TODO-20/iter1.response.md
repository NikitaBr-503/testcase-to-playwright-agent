```ts
import { test, expect } from '@playwright/test';

test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  // Todo entries are the list items that contain a completion checkbox
  // (the filter links at the bottom are list items too, but have no checkbox).
  const todoItems = page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });
  await expect(todoItems).toHaveCount(0);

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
  await page.locator('.toggle-all').click();

  // Step 5
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Написати статтю' })
    .getByRole('checkbox')
    .click();

  // Step 6
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Написати статтю');

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');

  // Step 8
  await page.locator('.toggle-all').click();

  // Step 9
  await page.getByRole('link', { name: 'Completed' }).click();

  // Step 10
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
  await expect(page.locator('.todo-count')).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Купити хліб');
  await expect(page.locator('.todo-count')).toHaveText(/1 item left/);
});
```