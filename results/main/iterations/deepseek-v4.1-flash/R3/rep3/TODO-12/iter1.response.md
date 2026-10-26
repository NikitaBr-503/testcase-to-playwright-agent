```ts
import { test, expect } from '@playwright/test';

test('TODO-12 Повернення до перегляду всіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const milkTodo = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await milkTodo.getByRole('checkbox').check();

  // Step 4
  await page.getByText('Completed', { exact: true }).click();
  await expect(milkTodo).toBeVisible();
  await expect(articleTodo).toBeHidden();

  // Step 5
  await page.getByText('All', { exact: true }).click();

  // Expected 1
  await expect(milkTodo).toBeVisible();
  await expect(articleTodo).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```