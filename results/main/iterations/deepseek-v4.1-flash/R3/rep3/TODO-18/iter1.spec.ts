import { test, expect } from '../../../../../support/fixtures';
test('TODO-18: Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

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
  await expect(page.getByRole('listitem')).toHaveCount(4);

  // Step 5
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .check();

  // Step 6
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Забронювати квиток' })
    .getByRole('checkbox')
    .check();

  // Step 7
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Написати статтю' })
    .locator('label')
    .dblclick();

  // Step 8
  const editInput = page.locator('li.editing').getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Написати статтю для Scopus' })
  ).toBeVisible();

  // Step 10
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Написати статтю для Scopus' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Купити молоко' })
  ).toHaveCount(0);
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Забронювати квиток' })
  ).toHaveCount(0);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 2
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Написати статтю для Scopus' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })
  ).toBeVisible();
  await expect(page.getByText(/2 items left/)).toBeVisible();
});
