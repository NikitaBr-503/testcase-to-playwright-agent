```ts
import { test, expect } from '@playwright/test';

test('TODO-06 Зняття позначки виконання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();

  // Step 2
  const todoCheckbox = todoItem.getByRole('checkbox');
  await todoCheckbox.click();
  await expect(todoCheckbox).toBeChecked();

  // Step 3
  await todoCheckbox.click();

  // Expected 1
  await expect(todoCheckbox).not.toBeChecked();
  await expect(todoItem).not.toHaveClass(/completed/);

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```