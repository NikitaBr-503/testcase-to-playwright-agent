import { test, expect } from '../../../../../support/fixtures';
test('TODO-05 Позначення завдання виконаним', async ({ page }) => {
  // Preconditions
  // Список завдань порожній (застосунок не зберігає завдання між запусками)
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  // Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();

  // Step 2
  // Натиснути прапорець ліворуч від завдання «Купити молоко».
  await todoItem.getByRole('checkbox').check();

  // Expected 1
  // Завдання «Купити молоко» позначене як виконане (текст перекреслено).
  await expect(todoItem).toHaveClass(/completed/);
  await expect(todoItem.getByRole('checkbox')).toBeChecked();
  await expect(todoItem.getByText('Купити молоко')).toHaveCSS('text-decoration-line', 'line-through');

  // Expected 2
  // Лічильник показує «0 items left!».
  await expect(page.getByText('0 items left!')).toBeVisible();
});
