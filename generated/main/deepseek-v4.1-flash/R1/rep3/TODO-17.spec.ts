import { test, expect } from '../../../../../support/fixtures';
test('TODO-17 Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await expect(page.locator('.todo-list li')).toHaveCount(0);

  const input = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');

  // Step 4
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .click();

  // Step 5
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Написати статтю' })
    .getByRole('checkbox')
    .click();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();

  // Step 7
  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await milkItem.hover();
  await milkItem.getByRole('button', { name: '×' }).click();

  // Expected 1
  const visibleItems = page.locator('.todo-list li');
  await expect(visibleItems).toHaveCount(1);
  await expect(visibleItems.first()).toHaveText('Написати статтю');
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toHaveCount(0);

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
