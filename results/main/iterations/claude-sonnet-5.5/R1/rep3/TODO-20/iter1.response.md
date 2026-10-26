```ts
import { test, expect } from '@playwright/test';

test('TODO-20: Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();

  const toggleAll = page.getByLabel('Mark all as complete');
  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();

  // Step 4
  await toggleAll.click();

  // Step 5
  const articleItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').click();

  // Step 6
  await clearCompleted.click();

  // Expected 1
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);
  await expect(page.getByText('1 item left!')).toBeVisible();

  // Step 7
  await input.fill('Підготувати презентацію');
  await input.press('Enter');
  await expect(page.getByText('Підготувати презентацію')).toBeVisible();

  // Step 8
  await toggleAll.click();

  // Step 9
  await page.getByText('Completed', { exact: true }).click();

  // Step 10
  await clearCompleted.click();

  // Expected 2
  await expect(page.getByText('Написати статтю')).toHaveCount(0);
  await expect(page.getByText('Підготувати презентацію')).toHaveCount(0);
  await expect(page.getByText(/items? left/)).toBeHidden();
  await expect(clearCompleted).toBeHidden();
  await expect(page.getByText('Completed', { exact: true })).toBeHidden();
  await expect(page.getByText('All', { exact: true })).toBeHidden();

  // Step 11
  await input.fill('Купити хліб');
  await input.press('Enter');

  // Step 12
  await page.getByText('All', { exact: true }).click();

  // Expected 3
  await expect(page.getByText('Купити хліб')).toBeVisible();
  await expect(page.getByText('Написати статтю')).toHaveCount(0);
  await expect(page.getByText('Підготувати презентацію')).toHaveCount(0);
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```