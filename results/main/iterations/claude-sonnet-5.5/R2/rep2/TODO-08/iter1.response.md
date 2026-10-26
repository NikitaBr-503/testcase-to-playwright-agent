```ts
import { test, expect } from '@playwright/test';

test('TODO-08: Редагування завдання подвійним клацанням', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('textbox', { name: 'New Todo Input' })).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 2
  const todoLabel = page.getByText('Написати статтю', { exact: true });
  await expect(todoLabel).toBeVisible();
  await todoLabel.dblclick();

  // Step 3
  const editInput = page.getByRole('textbox', { name: 'Edit' });
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 4
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();

  // Expected 2
  await expect(page.getByText('Написати статтю', { exact: true })).toHaveCount(0);
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
});
```