import { test, expect } from '../../../../../support/fixtures';
test('TODO-04 Обрізання пробілів на початку і в кінці завдання', async ({ page }) => {
  // Preconditions
  // Список завдань порожній (застосунок не зберігає завдання між запусками)
  await page.goto('/');
  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  // Ввести в поле «What needs to be done?» текст «   Купити хліб   » (з пробілами на початку і в кінці) і натиснути Enter.
  await newTodoInput.fill('   Купити хліб   ');
  await newTodoInput.press('Enter');

  // Expected 1
  // У списку відображається завдання з текстом «Купити хліб» без пробілів на початку і в кінці.
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити хліб' });
  await expect(todoItem).toHaveCount(1);
  await expect(todoItem.locator('label')).toHaveText(/^Купити хліб$/);

  // Expected 2
  // Поле «What needs to be done?» після додавання порожнє.
  await expect(newTodoInput).toHaveValue('');
});
