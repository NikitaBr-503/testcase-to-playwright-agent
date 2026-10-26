import { test, expect } from '../../../../../support/fixtures';
test('TODO-20: Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'New Todo Input' });
  const items = page.getByRole('listitem');
  const toggleAll = page.getByLabel('Mark all as complete');
  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  await expect(input).toBeVisible();
  await expect(items).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(items).toHaveCount(3);

  // Step 4
  await toggleAll.click();

  // Step 5
  await items.filter({ hasText: 'Написати статтю' }).getByRole('checkbox').click();

  // Step 6
  await clearCompleted.click();

  // Expected 1
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Step 7
  await input.fill('Підготувати презентацію');
  await input.press('Enter');
  await expect(items).toHaveCount(2);

  // Step 8
  await toggleAll.click();

  // Step 9
  await page.getByRole('link', { name: 'Completed' }).click();

  // Step 10
  await clearCompleted.click();

  // Expected 2
  await expect(items).toHaveCount(0);
  await expect(clearCompleted).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
  await expect(page.getByText(/items? left/)).toBeHidden();

  // Step 11
  await input.fill('Купити хліб');
  await input.press('Enter');

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Купити хліб');
  await expect(page.getByText('1 item left!')).toBeVisible();
});
