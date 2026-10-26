```ts
import { test, expect } from '@playwright/test';

test('TODO-12 Повернення до перегляду всіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'New Todo Input' })).toHaveValue('');

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  const milkTodo = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await expect(milkTodo).toBeVisible();
  await expect(articleTodo).toBeVisible();

  // Step 3
  await milkTodo.getByRole('checkbox').click();
  await expect(milkTodo.getByRole('checkbox')).toBeChecked();

  // Step 4
  await page.getByRole('link', { name: 'Completed' }).click();

  // Step 5
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 1
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```