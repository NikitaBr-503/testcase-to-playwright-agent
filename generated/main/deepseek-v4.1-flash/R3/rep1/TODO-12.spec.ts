import { test, expect } from '../../../../../support/fixtures';
test('TODO-12 Повернення до перегляду всіх завдань', async ({ page }) => {
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
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .check();

  // Step 4
  await page.getByRole('link', { name: 'Completed' }).click();

  // Step 5
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 1
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Купити молоко' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Написати статтю' })
  ).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
