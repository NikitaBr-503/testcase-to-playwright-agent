```ts
import { test, expect } from '@playwright/test';

test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const toggleAll = page
    .getByRole('checkbox', { name: /toggle all|mark all as complete/i })
    .or(page.getByRole('button', { name: /toggle all|mark all as complete/i }))
    .or(page.locator('input.toggle-all'));

  const milkTodo = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await expect(milkTodo).toBeVisible();
  await expect(articleTodo).toBeVisible();
  await toggleAll.click();
  await expect(milkTodo.getByRole('checkbox')).toBeChecked();
  await expect(articleTodo.getByRole('checkbox')).toBeChecked();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(milkTodo.getByRole('checkbox')).not.toBeChecked();
  await expect(articleTodo.getByRole('checkbox')).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```