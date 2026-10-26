```ts
import { test, expect } from '@playwright/test';

test('TODO-17 Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  // Preconditions
  await page.goto('/');
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

  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const articleItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  const callItem = page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' });

  await expect(milkItem).toBeVisible();
  await expect(articleItem).toBeVisible();
  await expect(callItem).toBeVisible();

  // Step 4
  await milkItem.getByRole('checkbox').check();
  await expect(milkItem.getByRole('checkbox')).toBeChecked();

  // Step 5
  await articleItem.getByRole('checkbox').check();
  await expect(articleItem.getByRole('checkbox')).toBeChecked();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(2);

  // Step 7
  await milkItem.hover();
  await milkItem.getByRole('button').click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(articleItem).toBeVisible();
  await expect(milkItem).not.toBeVisible();
  await expect(callItem).not.toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!', { exact: true })).toBeVisible();
});
```