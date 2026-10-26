import { test, expect } from '../../../../../support/fixtures';
test('TODO-15: Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Купити молоко', { exact: true })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю', { exact: true })).toBeVisible();

  const todoCheckboxes = page.getByRole('listitem').getByRole('checkbox');
  await expect(todoCheckboxes).toHaveCount(2);

  const toggleAll = page
    .getByRole('button', { name: /toggle all|mark all|complete all|check all|select all/i })
    .or(page.getByRole('checkbox', { name: /toggle all|mark all|complete all|check all|select all/i }));

  // Step 3
  await toggleAll.first().click({ force: true });
  await expect(todoCheckboxes.nth(0)).toBeChecked();
  await expect(todoCheckboxes.nth(1)).toBeChecked();

  // Step 4
  await toggleAll.first().click({ force: true });

  // Expected 1
  await expect(todoCheckboxes.nth(0)).not.toBeChecked();
  await expect(todoCheckboxes.nth(1)).not.toBeChecked();

  // Expected 2
  await expect(page.getByText(/^\s*2\s+items\s+left!?\s*$/)).toBeVisible();
});
