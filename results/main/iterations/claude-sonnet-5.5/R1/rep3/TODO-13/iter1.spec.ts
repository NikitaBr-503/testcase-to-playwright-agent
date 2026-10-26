import { test, expect } from '../../../../../support/fixtures';
test('TODO-13: Очищення виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();

  // Step 4
  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await milkItem.getByRole('checkbox').check();
  await expect(milkItem.getByRole('checkbox')).toBeChecked();

  // Step 5
  const callItem = page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' });
  await callItem.getByRole('checkbox').check();
  await expect(callItem.getByRole('checkbox')).toBeChecked();

  // Step 6
  const clearButton = page.getByRole('button', { name: 'Clear completed' });
  await expect(clearButton).toBeVisible();
  await clearButton.click();

  // Expected 1
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);
  await expect(page.getByTestId('todo-item')).toHaveCount(1);

  // Expected 2
  await expect(page.getByRole('button', { name: 'Clear completed' })).toHaveCount(0);
});
