import { test, expect } from '../../../../../support/fixtures';
test('TODO-02: Додавання трьох завдань', async ({ page }) => {
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

  // Expected 1
  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(3);
  await expect(items).toHaveText([
    'Купити молоко',
    'Написати статтю',
    'Подзвонити керівнику',
  ]);

  // Expected 2
  await expect(page.getByText('3 items left!')).toBeVisible();
});
