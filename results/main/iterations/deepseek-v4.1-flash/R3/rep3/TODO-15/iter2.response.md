```ts
import { test, expect } from '@playwright/test';

test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // The todo list lives inside the <main> region; the filter links (All / Active /
  // Completed) are also rendered as list items, so scope the todo items to <main>.
  const todoItems = page.getByRole('main').getByRole('listitem');
  const todoItem = (text: string) => todoItems.filter({ hasText: text });

  // The "toggle all" control is a checkbox whose accessible name contains "Toggle All"
  const toggleAll = page.getByRole('checkbox', { name: /Toggle All/i });

  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItem('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItem('Написати статтю')).toBeVisible();
  await expect(todoItems).toHaveCount(2);

  // Step 3
  await toggleAll.check();
  await expect(todoItem('Купити молоко').getByRole('checkbox')).toBeChecked();
  await expect(todoItem('Написати статтю').getByRole('checkbox')).toBeChecked();

  // Step 4
  await toggleAll.uncheck();
  await expect(toggleAll).not.toBeChecked();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItem('Купити молоко').getByRole('checkbox')).not.toBeChecked();
  await expect(todoItem('Написати статтю').getByRole('checkbox')).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```