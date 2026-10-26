import { test, expect } from '../../../../../support/fixtures';
test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(2);

  // Step 3
  const toggleAll = page.getByLabel(/toggle all|mark all as complete/i);
  await toggleAll.click();

  // Step 4
  await toggleAll.click();

  // Expected 1
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(2);
  await expect(items.nth(0).getByRole('checkbox')).not.toBeChecked();
  await expect(items.nth(1).getByRole('checkbox')).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
