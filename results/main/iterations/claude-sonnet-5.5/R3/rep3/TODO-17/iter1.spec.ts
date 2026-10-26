import { test, expect } from '../../../../../support/fixtures';
test('TODO-17 Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');

  const milk = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const article = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await expect(milk).toBeVisible();
  await expect(article).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  await milk.getByRole('checkbox').check();

  // Step 5
  await article.getByRole('checkbox').check();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(2);

  // Step 7
  await milk.hover();
  await milk.getByRole('button').click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);

  // Expected 2
  await expect(page.getByText(/1 item left!?/)).toBeVisible();
});
