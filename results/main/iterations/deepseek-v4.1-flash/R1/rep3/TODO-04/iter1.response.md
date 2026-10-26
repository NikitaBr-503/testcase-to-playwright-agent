```ts
import { test, expect } from '@playwright/test';

test('TODO-04 Обрізання пробілів на початку і в кінці завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('   Купити хліб   ');
  await newTodoInput.press('Enter');

  // Expected 1
  const todoItems = page.getByRole('listitem');
  await expect(todoItems).toHaveCount(1);
  const todoLabel = todoItems.first().getByText('Купити хліб', { exact: true });
  await expect(todoLabel).toBeVisible();
  expect(await todoLabel.textContent()).toBe('Купити хліб');

  // Expected 2
  await expect(newTodoInput).toHaveValue('');
});
```