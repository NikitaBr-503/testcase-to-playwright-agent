```ts
import { test, expect } from '@playwright/test';

test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  const milkTodo = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });

  await expect(milkTodo).toBeVisible();
  await expect(articleTodo).toBeVisible();

  const toggleAll = page.getByRole('checkbox', { name: 'Mark all as complete' });

  // Step 3
  await toggleAll.click();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(milkTodo.getByRole('checkbox')).not.toBeChecked();
  await expect(articleTodo.getByRole('checkbox')).not.toBeChecked();
  await expect(toggleAll).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```