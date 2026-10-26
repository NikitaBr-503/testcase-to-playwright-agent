import { test, expect } from '../../../../../support/fixtures';
test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.getByRole('listitem');
  const todoCheckboxes = todoItems.getByRole('checkbox');
  // The "toggle all" control is the arrow left of the input (standard TodoMVC class)
  const toggleAll = page.locator('.toggle-all');
  const clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  const allFilter = page.getByText('All', { exact: true });
  const completedFilter = page.getByText('Completed', { exact: true });
  const itemsLeftCounter = page.getByText(/^1 item left!?$/);

  // Preconditions
  await page.goto('/');
  await expect(newTodoInput).toBeVisible();
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await toggleAll.click();
  await expect(todoCheckboxes).toHaveCount(3);
  await expect(todoCheckboxes.nth(0)).toBeChecked();
  await expect(todoCheckboxes.nth(1)).toBeChecked();
  await expect(todoCheckboxes.nth(2)).toBeChecked();

  // Step 5
  const articleItem = todoItems.filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').click();
  await expect(articleItem.getByRole('checkbox')).not.toBeChecked();

  // Step 6
  await clearCompletedButton.click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Підготувати презентацію' })).toBeVisible();

  // Step 8
  await toggleAll.click();
  await expect(todoCheckboxes).toHaveCount(2);
  await expect(todoCheckboxes.nth(0)).toBeChecked();
  await expect(todoCheckboxes.nth(1)).toBeChecked();

  // Step 9
  await completedFilter.click();
  await expect(todoItems).toHaveCount(2);

  // Step 10
  await clearCompletedButton.click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(clearCompletedButton).toBeHidden();
  await expect(allFilter).toBeHidden();
  await expect(completedFilter).toBeHidden();
  await expect(page.getByText(/items? left/)).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');

  // Step 12
  await allFilter.click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Купити хліб' })).toBeVisible();
  await expect(itemsLeftCounter).toBeVisible();
});
