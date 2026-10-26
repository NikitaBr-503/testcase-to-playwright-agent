```ts
import { test, expect } from '@playwright/test';

test('TODO-10 Фільтр активних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');

  await expect(page.getByRole('listitem')).toHaveCount(3);

  // Step 4
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await articleTodo.getByRole('checkbox').click();
  await expect(articleTodo.getByRole('checkbox')).toBeChecked();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(page.getByText('Купити молоко', { exact: true })).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику', { exact: true })).toBeVisible();
  await expect(page.getByText('Написати статтю', { exact: true })).toHaveCount(0);

  // Expected 2
  await expect(page).toHaveURL(/#\/active$/);
  await expect(page.getByRole('link', { name: 'Active' })).toHaveClass(/selected/);
});
```