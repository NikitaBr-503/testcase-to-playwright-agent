```ts
import { test, expect } from '@playwright/test';

test('TODO-06 Зняття позначки виконання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();

  // Step 2
  const toggle = todoItem.getByRole('checkbox');
  await toggle.click();
  await expect(toggle).toBeChecked();

  // Step 3
  await toggle.click();

  // Expected 1
  await expect(toggle).not.toBeChecked();
  await expect(todoItem).not.toHaveClass(/completed/);

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```