import { test, expect } from '../../../../../support/fixtures';
test('TODO-18: Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

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
  await expect(page.getByTestId('todo-item')).toHaveCount(4);

  // Step 5
  const milk = page.getByTestId('todo-item').filter({ hasText: 'Купити молоко' });
  await milk.getByRole('checkbox').check();

  // Step 6
  const ticket = page.getByTestId('todo-item').filter({ hasText: 'Забронювати квиток' });
  await ticket.getByRole('checkbox').check();

  // Step 7
  const article = page.getByTestId('todo-item').filter({ hasText: 'Написати статтю' });
  await article.getByText('Написати статтю').dblclick();

  // Step 8
  const editInput = page.getByTestId('todo-item').getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');

  // Step 10
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(2);
  await expect(items.filter({ hasText: 'Написати статтю для Scopus' })).toHaveCount(1);
  await expect(items.filter({ hasText: 'Подзвонити керівнику' })).toHaveCount(1);
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Забронювати квиток')).toHaveCount(0);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 2
  await expect(items).toHaveCount(2);
  await expect(items.filter({ hasText: 'Написати статтю для Scopus' })).toHaveCount(1);
  await expect(items.filter({ hasText: 'Подзвонити керівнику' })).toHaveCount(1);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
