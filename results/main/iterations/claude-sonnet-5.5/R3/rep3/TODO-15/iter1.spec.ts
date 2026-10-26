import { test, expect } from '../../../../../support/fixtures';
test('TODO-15: Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  const firstItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(firstItem).toBeVisible();

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');
  const secondItem = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await expect(secondItem).toBeVisible();

  // Step 3
  const toggleAll = page.getByLabel('Mark all as complete');
  await toggleAll.click();
  await expect(firstItem.getByRole('checkbox')).toBeChecked();
  await expect(secondItem.getByRole('checkbox')).toBeChecked();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(firstItem.getByRole('checkbox')).not.toBeChecked();
  await expect(secondItem.getByRole('checkbox')).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
