import { test, expect } from '../../../../../support/fixtures';
test('TODO-11: Фільтр виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(page.getByTestId('todo-item')).toHaveCount(3);

  // Step 4
  const articleItem = page.getByTestId('todo-item').filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').check();

  // Step 5
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 1
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
  await expect(page.getByTestId('todo-item').first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/completed$/);
});
