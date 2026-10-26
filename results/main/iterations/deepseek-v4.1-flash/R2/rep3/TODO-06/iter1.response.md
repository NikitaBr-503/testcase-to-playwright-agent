```ts
import { test, expect } from '@playwright/test';

test('TODO-06 Зняття позначки виконання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();
  const todoToggle = todoItem.getByRole('checkbox');

  // Step 2
  await todoToggle.click();
  await expect(todoToggle).toBeChecked();

  // Step 3
  await todoToggle.click();

  // Expected 1
  await expect(todoToggle).not.toBeChecked();
  await expect(todoItem.getByText('Купити молоко')).toBeVisible();

  // Expected 2
  await expect(page.getByText(/1 item left!?/)).toBeVisible();
});
```