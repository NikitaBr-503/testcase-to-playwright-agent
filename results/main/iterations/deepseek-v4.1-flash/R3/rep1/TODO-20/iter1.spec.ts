import { test, expect } from '../../../../../support/fixtures';
test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const toggleAll = page.locator('.toggle-all');
  const todoItems = page.getByRole('listitem');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(1);

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await toggleAll.click();
  await expect(todoItems.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(2).getByRole('checkbox')).toBeChecked();

  // Step 5
  const articleItem = todoItems.filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').click();
  await expect(articleItem.getByRole('checkbox')).not.toBeChecked();

  // Step 6
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Написати статтю');

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);

  // Step 8
  await toggleAll.click();
  await expect(todoItems.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();

  // Step 9
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(todoItems).toHaveCount(2);

  // Step 10
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(page.locator('.todo-count')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Купити хліб');
  await expect(page.locator('.todo-count')).toHaveText(/1 item left/);
});
