import { test, expect } from '../../../../../support/fixtures';
test('TODO-18 Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.locator('.todo-list > li');
  await expect(newTodo).toBeVisible();
  await expect(todoItems).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');

  // Step 4
  await newTodo.fill('Забронювати квиток');
  await newTodo.press('Enter');
  await expect(todoItems).toHaveCount(4);

  // Step 5
  const milk = todoItems.filter({ hasText: 'Купити молоко' });
  await milk.getByRole('checkbox').check();

  // Step 6
  const ticket = todoItems.filter({ hasText: 'Забронювати квиток' });
  await ticket.getByRole('checkbox').check();

  // Step 7
  const article = todoItems.filter({ hasText: 'Написати статтю' });
  await article.getByText('Написати статтю').dblclick();

  // Step 8
  const editField = article.getByRole('textbox');
  await expect(editField).toBeVisible();
  await editField.fill('Написати статтю для Scopus');

  // Step 9
  await editField.press('Enter');
  await expect(todoItems.filter({ hasText: 'Написати статтю для Scopus' })).toHaveCount(1);

  // Step 10
  await page.getByText('Active', { exact: true }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems).toHaveText(['Написати статтю для Scopus', 'Подзвонити керівнику']);
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Забронювати квиток')).toHaveCount(0);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByText('All', { exact: true }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems).toHaveText(['Написати статтю для Scopus', 'Подзвонити керівнику']);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
