```ts
import { test, expect } from '@playwright/test';

test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });
  const toggleAll = page.locator('.toggle-all');
  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });

  await expect(newTodoInput).toBeVisible();
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

  // Step 4
  await toggleAll.click();

  // Step 5
  await todoItems.filter({ hasText: 'Написати статтю' }).getByRole('checkbox').click();

  // Step 6
  await clearCompleted.click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');

  // Step 8
  await toggleAll.click();

  // Step 9
  await page.getByText('Completed', { exact: true }).click();

  // Step 10
  await clearCompleted.click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(clearCompleted).toBeHidden();
  await expect(page.getByText(/\d+ items? left!/)).toBeHidden();
  await expect(page.getByText('All', { exact: true })).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');

  // Step 12
  await page.getByText('All', { exact: true }).click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Купити хліб' })).toBeVisible();
  await expect(page.getByText('1 item left!', { exact: true })).toBeVisible();
});
```