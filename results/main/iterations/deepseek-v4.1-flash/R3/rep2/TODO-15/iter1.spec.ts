import { test, expect } from '../../../../../support/fixtures';
test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.getByRole('listitem');
  const itemCheckboxes = todoItems.getByRole('checkbox');
  const toggleAll = page.getByRole('checkbox', { name: /toggle all|mark all as complete/i });

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await toggleAll.check();
  await expect(toggleAll).toBeChecked();
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.first()).toBeChecked();
  await expect(itemCheckboxes.nth(1)).toBeChecked();
  await expect(page.getByText('0 items left!')).toBeVisible();

  // Step 4
  await toggleAll.uncheck();
  await expect(toggleAll).not.toBeChecked();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.first()).not.toBeChecked();
  await expect(itemCheckboxes.nth(1)).not.toBeChecked();
  await expect(page.locator('li.completed')).toHaveCount(0);

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
