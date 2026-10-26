import { test, expect } from '../../../../../support/fixtures';
test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(page.getByText('Подзвонити керівнику')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(3);

  // Step 4
  await page.getByLabel('Mark all as complete').check();

  // Expected 1
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(3);
  const checkboxes = items.getByRole('checkbox');
  await expect(checkboxes).toHaveCount(3);
  for (let i = 0; i < 3; i++) {
    await expect(checkboxes.nth(i)).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
