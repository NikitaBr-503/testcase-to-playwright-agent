import { test, expect } from '../../../../../support/fixtures';
test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(2);

  // Step 3
  // The "toggle all" control (arrow left of the input) is rendered as the TodoMVC
  // '.toggle-all' checkbox/button element and has no reliable accessible name.
  const toggleAll = page.locator('.toggle-all');
  await toggleAll.click();

  const todoCheckboxes = page.getByTestId('todo-item').getByRole('checkbox');
  await expect(todoCheckboxes).toHaveCount(2);
  await expect(todoCheckboxes.nth(0)).toBeChecked();
  await expect(todoCheckboxes.nth(1)).toBeChecked();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(todoCheckboxes.nth(0)).not.toBeChecked();
  await expect(todoCheckboxes.nth(1)).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
