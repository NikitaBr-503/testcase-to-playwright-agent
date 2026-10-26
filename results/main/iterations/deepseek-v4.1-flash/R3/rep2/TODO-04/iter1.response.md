```ts
import { test, expect } from '@playwright/test';

test('TODO-04 Обрізання пробілів на початку і в кінці завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await expect(newTodoInput).toBeVisible();
  await expect(newTodoInput).toHaveValue('');
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('   Купити хліб   ');
  await newTodoInput.press('Enter');

  // Expected 1
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити хліб' });
  await expect(todoItem).toHaveCount(1);
  await expect(todoItem).toBeVisible();
  const todoText = await todoItem.locator('label').textContent();
  expect(todoText).toBe('Купити хліб');

  // Expected 2
  await expect(newTodoInput).toHaveValue('');
});
```