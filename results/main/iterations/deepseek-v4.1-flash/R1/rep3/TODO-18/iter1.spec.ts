import { test, expect } from '../../../../../support/fixtures';
test('TODO-18 Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Написати статтю', { exact: true })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();

  // Step 4
  await newTodoInput.fill('Забронювати квиток');
  await newTodoInput.press('Enter');
  await expect(page.getByText('Забронювати квиток')).toBeVisible();

  // Step 5
  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await milkItem.getByRole('checkbox').check();
  await expect(milkItem.getByRole('checkbox')).toBeChecked();

  // Step 6
  const ticketItem = page.getByRole('listitem').filter({ hasText: 'Забронювати квиток' });
  await ticketItem.getByRole('checkbox').check();
  await expect(ticketItem.getByRole('checkbox')).toBeChecked();

  // Step 7
  const articleItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await articleItem.getByText('Написати статтю', { exact: true }).dblclick();

  // Step 8
  const editInput = articleItem.getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');
  await expect(page.getByText('Написати статтю для Scopus')).toBeVisible();

  // Step 10
  await page.getByText('Active', { exact: true }).click();

  // Expected 1
  await expect(page.getByText('Написати статтю для Scopus')).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();
  await expect(page.getByText('Купити молоко')).toBeHidden();
  await expect(page.getByText('Забронювати квиток')).toBeHidden();

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByText('All', { exact: true }).click();

  // Expected 2
  await expect(page.getByText('Написати статтю для Scopus')).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Забронювати квиток')).toHaveCount(0);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
