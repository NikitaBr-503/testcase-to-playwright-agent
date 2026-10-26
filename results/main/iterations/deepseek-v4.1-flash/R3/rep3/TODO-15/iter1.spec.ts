import { test, expect } from '../../../../../support/fixtures';
test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  const todoItems = page.getByRole('listitem');
  await expect(todoItems).toHaveCount(0);

  const toggleAll = page
    .getByRole('checkbox', { name: /toggle all|mark all|select all|complete all|all as complete/i })
    .or(page.getByRole('button', { name: /toggle all|mark all|select all|complete all|all as complete/i }))
    .or(page.getByTestId('toggle-all'))
    .or(page.locator('#toggle-all'))
    .or(page.locator('.toggle-all').first());

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await toggleAll.click();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Купити молоко' }).getByRole('checkbox')).not.toBeChecked();
  await expect(todoItems.filter({ hasText: 'Написати статтю' }).getByRole('checkbox')).not.toBeChecked();

  // Expected 2
  const footer = page.getByRole('contentinfo');
  await expect(footer).toContainText(/2 items? left/);
});
