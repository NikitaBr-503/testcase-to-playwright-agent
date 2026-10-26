import { test, expect } from '../../../../../support/fixtures';
test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  const todoItems = page.getByRole('listitem');
  await expect(todoItems).toHaveCount(2);

  // Step 3
  // The "toggle all" control is a visually hidden checkbox that is rendered only when the list is
  // not empty and has no reliable accessible name, so its stable TodoMVC class is used.
  const toggleAll = page.locator('.toggle-all');
  await toggleAll.click();
  await expect(todoItems.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.nth(0).getByRole('checkbox')).not.toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).not.toBeChecked();
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).not.toHaveClass(/completed/);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).not.toHaveClass(/completed/);

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
