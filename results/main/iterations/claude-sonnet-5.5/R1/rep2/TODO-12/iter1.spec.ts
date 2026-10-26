import { test, expect } from '../../../../../support/fixtures';
test('TODO-12 Повернення до перегляду всіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  const milkItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await milkItem.getByRole('checkbox').check();

  // Step 4
  await page.getByText('Completed', { exact: true }).click();

  // Step 5
  await page.getByText('All', { exact: true }).click();

  // Expected 1
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
