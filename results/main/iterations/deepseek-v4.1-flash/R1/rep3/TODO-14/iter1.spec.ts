import { test, expect } from '../../../../../support/fixtures';
test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
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
  await page.getByRole('checkbox', { name: 'Mark all as complete' }).check();

  // Expected 1
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Купити молоко' }).getByRole('checkbox')
  ).toBeChecked();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Написати статтю' }).getByRole('checkbox')
  ).toBeChecked();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' }).getByRole('checkbox')
  ).toBeChecked();

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
