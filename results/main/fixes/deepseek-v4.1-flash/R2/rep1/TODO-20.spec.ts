import { test, expect } from '../../../../../support/fixtures';
test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  const todoItem = (text: string) => page.getByRole('listitem').filter({ hasText: text });

  // Toggle-all control: arrow to the left of the "What needs to be done?" input
  const toggleAll = page
    .getByRole('checkbox', { name: /mark all|toggle all|complete all/i })
    .or(page.getByRole('button', { name: /mark all|toggle all|complete all/i }))
    .or(page.locator('.toggle-all'))
    .or(page.locator('input[type="checkbox"]'))
    .first();

  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });

  const filterLink = (name: string) =>
    page
      .getByRole('link', { name, exact: true })
      .or(page.getByRole('button', { name, exact: true }))
      .first();

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItem('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItem('Написати статтю')).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItem('Подзвонити керівнику')).toBeVisible();

  // Step 4
  await toggleAll.click();

  // Step 5
  await todoItem('Написати статтю').getByRole('checkbox').click();

  // Step 6
  await clearCompleted.click();

  // Expected 1
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
  await expect(todoItem('Написати статтю')).toBeVisible();
  await expect(page.getByText('Купити молоко')).toBeHidden();
  await expect(page.getByText('Подзвонити керівнику')).toBeHidden();

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');
  await expect(todoItem('Підготувати презентацію')).toBeVisible();

  // Step 8
  await toggleAll.click();

  // Step 9
  await filterLink('Completed').click();
  await expect(todoItem('Підготувати презентацію')).toBeVisible();

  // Step 10
  await clearCompleted.click();

  // Expected 2
  await expect(page.getByTestId('todo-item')).toHaveCount(0);
  await expect(page.getByText('Написати статтю')).toBeHidden();
  await expect(page.getByText('Підготувати презентацію')).toBeHidden();
  await expect(clearCompleted).toBeHidden();
  await expect(page.getByText(/item left/i).first()).toBeHidden();
  await expect(filterLink('All')).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');

  // Step 12
  await filterLink('All').click();

  // Expected 3
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
  await expect(todoItem('Купити хліб')).toBeVisible();
  await expect(page.getByText(/1 item left/i).first()).toBeVisible();
});
