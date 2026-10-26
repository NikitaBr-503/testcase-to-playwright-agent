```ts
import { test, expect } from '@playwright/test';

test('TODO-04 Обрізання пробілів на початку і в кінці завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByTestId('todo-list').locator('li')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('   Купити хліб   ');
  await newTodoInput.press('Enter');

  // Expected 1
  const todoItems = page.getByTestId('todo-list').locator('li');
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toHaveText('Купити хліб');
  await expect(page.getByText('Купити хліб', { exact: true })).toBeVisible();

  // Expected 2
  await expect(newTodoInput).toHaveValue('');
});
```