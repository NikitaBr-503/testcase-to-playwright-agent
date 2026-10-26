```ts
import { test, expect } from '@playwright/test';

test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  // Scope the todo items to the main region so the filter links list is not counted
  const todoItems = page.getByRole('main').getByRole('listitem');
  const toggleAll = page.getByTestId('toggle-all');

  await expect(newTodoInput).toBeVisible();
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  // The toggle-all control is a checkbox whose visible arrow area is overlapped by the
  // input itself, so it is activated directly on the checkbox element.
  await toggleAll.check();
  await expect(toggleAll).toBeChecked();
  await expect(todoItems.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();
  await expect(page.getByText(/0 items left!/)).toBeVisible();

  // Step 4
  await toggleAll.uncheck();
  await expect(toggleAll).not.toBeChecked();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.nth(0).getByRole('checkbox')).not.toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).not.toBeChecked();

  // Expected 2
  await expect(page.getByText(/2 items left!/)).toBeVisible();
});
```