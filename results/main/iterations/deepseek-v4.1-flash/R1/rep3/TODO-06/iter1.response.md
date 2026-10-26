```ts
import { test, expect } from '@playwright/test';

test('TODO-06 Зняття позначки виконання', async ({ page }) => {
  // Preconditions: список завдань порожній
  await page.goto('/');
  await expect(page.getByTestId('todo-count')).toBeHidden();

  // Step 1: Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2: Натиснути прапорець ліворуч від завдання «Купити молоко»
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const toggle = todoItem.getByRole('checkbox');
  await toggle.check();
  await expect(toggle).toBeChecked();

  // Step 3: Натиснути прапорець ліворуч від завдання «Купити молоко»
  await toggle.uncheck();

  // Expected 1: Завдання «Купити молоко» не позначене як виконане
  await expect(todoItem.getByRole('checkbox')).not.toBeChecked();
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).not.toHaveClass(
    /completed/
  );

  // Expected 2: Лічильник показує «1 item left!»
  await expect(page.getByTestId('todo-count')).toHaveText('1 item left!');
});
```