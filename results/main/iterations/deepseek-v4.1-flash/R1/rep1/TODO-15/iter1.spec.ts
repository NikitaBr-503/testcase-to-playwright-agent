import { test, expect } from '../../../../../support/fixtures';
test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  const todoItems = page.getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(1);
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Step 3
  const toggleAll = page.getByRole('checkbox', {
    name: /mark all as complete|toggle all/i,
  });
  await toggleAll.click();
  for (const item of await todoItems.all()) {
    await expect(item.getByRole('checkbox')).toBeChecked();
  }

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  for (const item of await todoItems.all()) {
    await expect(item.getByRole('checkbox')).not.toBeChecked();
  }

  // Expected 2
  const itemsLeftCounter = page.locator('.todo-count');
  await expect(itemsLeftCounter).toHaveText('2 items left!');
});
