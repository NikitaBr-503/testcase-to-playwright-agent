import { test, expect } from '../../../../../support/fixtures';
test('TODO-14: Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByText('items left!')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  const todoItems = page.getByRole('main').getByRole('list').first().getByRole('listitem');
  await expect(todoItems).toHaveCount(3);
  await expect(page.getByText('3 items left!')).toBeVisible();

  // Step 4
  await page.getByRole('checkbox', { name: 'Toggle All Input' }).check({ force: true });

  // Expected 1
  const items = ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику'];
  for (const text of items) {
    await expect(
      todoItems.filter({ hasText: text }).getByRole('checkbox')
    ).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
