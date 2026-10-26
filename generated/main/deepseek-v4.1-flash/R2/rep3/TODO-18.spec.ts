import { test, expect } from '../../../../../support/fixtures';
test('TODO-18 Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  await newTodoInput.fill('Забронювати квиток');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Забронювати квиток' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(4);

  // Step 5
  const milkTodo = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await milkTodo.getByRole('checkbox').check();
  await expect(milkTodo.getByRole('checkbox')).toBeChecked();

  // Step 6
  const ticketTodo = page.getByRole('listitem').filter({ hasText: 'Забронювати квиток' });
  await ticketTodo.getByRole('checkbox').check();
  await expect(ticketTodo.getByRole('checkbox')).toBeChecked();

  // Step 7
  await page.getByText('Написати статтю', { exact: true }).dblclick();

  // Step 8
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  const editInput = articleTodo.getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();

  // Step 10
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику', { exact: true })).toBeVisible();
  await expect(page.getByText('Купити молоко', { exact: true })).toBeHidden();
  await expect(page.getByText('Забронювати квиток', { exact: true })).toBeHidden();

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 2
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику', { exact: true })).toBeVisible();
  await expect(page.getByText('Купити молоко', { exact: true })).toBeHidden();
  await expect(page.getByText('Забронювати квиток', { exact: true })).toBeHidden();
  await expect(page.getByText('2 items left!')).toBeVisible();
});
