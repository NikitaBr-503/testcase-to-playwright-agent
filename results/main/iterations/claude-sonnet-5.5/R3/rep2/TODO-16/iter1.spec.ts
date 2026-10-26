import { test, expect } from '../../../../../support/fixtures';
test('TODO-16: Кнопка очищення відсутня без виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Expected 1
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clear completed' })).toHaveCount(0);

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Expected 2
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clear completed' })).toHaveCount(0);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
