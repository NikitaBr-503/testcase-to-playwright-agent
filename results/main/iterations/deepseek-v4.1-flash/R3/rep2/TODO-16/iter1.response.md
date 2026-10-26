```ts
import { test, expect } from '@playwright/test';

test('TODO-16 Кнопка очищення відсутня без виконаних завдань', async ({ page }) => {
  // Preconditions
  // Список завдань порожній (застосунок не зберігає завдання між запусками)
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();

  // Expected 2
  await expect(page.getByText(/2 items left/)).toBeVisible();
});
```