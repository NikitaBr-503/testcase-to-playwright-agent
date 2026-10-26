import { test, expect } from '../../../../../support/fixtures';
test('TODO-15: Зняття позначки з усіх завдань', async ({ page }) => {
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

  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(2);
  const toggleAll = page.getByRole('checkbox', { name: /Toggle All Input/ });

  // Step 3
  await toggleAll.check({ force: true });
  await expect(items.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(items.nth(1).getByRole('checkbox')).toBeChecked();

  // Step 4
  await toggleAll.uncheck({ force: true });

  // Expected 1
  await expect(items.nth(0).getByRole('checkbox')).not.toBeChecked();
  await expect(items.nth(1).getByRole('checkbox')).not.toBeChecked();
  await expect(items.nth(0)).not.toHaveClass(/completed/);
  await expect(items.nth(1)).not.toHaveClass(/completed/);

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
