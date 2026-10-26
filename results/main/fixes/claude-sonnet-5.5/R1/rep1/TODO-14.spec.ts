import { test, expect } from '../../../../../support/fixtures';
test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
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
  await page.getByTestId('toggle-all').click();

  // Expected 1
  const items = ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику'];
  for (const text of items) {
    const item = page.getByRole('listitem').filter({ hasText: text });
    await expect(item.getByRole('checkbox')).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
