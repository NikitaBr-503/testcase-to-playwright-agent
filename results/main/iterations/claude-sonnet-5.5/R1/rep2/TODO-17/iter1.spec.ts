import { test, expect } from '../../../../../support/fixtures';
test('TODO-17: Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');

  const milk = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const article = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await expect(page.getByRole('listitem')).toHaveCount(3);

  // Step 4
  await milk.getByRole('checkbox').check();

  // Step 5
  await article.getByRole('checkbox').check();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();

  // Step 7
  await milk.hover();
  await milk.getByRole('button', { name: '×' }).click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem').first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toHaveCount(0);

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
