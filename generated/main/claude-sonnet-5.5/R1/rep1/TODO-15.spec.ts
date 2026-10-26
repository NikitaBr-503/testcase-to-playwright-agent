import { test, expect } from '../../../../../support/fixtures';
test('TODO-15: Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Step 3
  const toggleAll = page.getByLabel('Mark all as complete');
  await toggleAll.click();

  // Step 4
  await toggleAll.click();

  // Expected 1
  const itemCheckboxes = page.getByRole('listitem').getByRole('checkbox');
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.nth(0)).not.toBeChecked();
  await expect(itemCheckboxes.nth(1)).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
