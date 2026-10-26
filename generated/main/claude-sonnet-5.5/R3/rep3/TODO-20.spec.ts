import { test, expect } from '../../../../../support/fixtures';
test('TODO-20: Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  const items = page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');
  await expect(items).toHaveCount(3);

  // Step 4
  await page.getByTestId('toggle-all').click();

  // Step 5
  await items.filter({ hasText: 'Написати статтю' }).getByRole('checkbox').click();

  // Step 6
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 1
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Step 7
  await newTodo.fill('Підготувати презентацію');
  await newTodo.press('Enter');
  await expect(items).toHaveCount(2);

  // Step 8
  await page.getByTestId('toggle-all').click();

  // Step 9
  await page.getByRole('link', { name: 'Completed' }).click();

  // Step 10
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 2
  await expect(items).toHaveCount(0);
  await expect(page.getByText(/items? left/)).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();

  // Step 11
  await newTodo.fill('Купити хліб');
  await newTodo.press('Enter');

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Купити хліб');
  await expect(page.getByText('1 item left!')).toBeVisible();
});
