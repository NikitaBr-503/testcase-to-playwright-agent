import { test, expect } from '../../../../../support/fixtures';
test('TODO-15: Зняття позначки з усіх завдань', async ({ page }) => {
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
  const toggleAll = page.getByLabel('Mark all as complete');
  await toggleAll.click();
  await expect(page.getByText('0 items left!')).toBeVisible();

  // Step 4
  await toggleAll.click();

  // Expected 1
  const firstItemCheckbox = page.getByRole('listitem').filter({ hasText: 'Купити молоко' }).getByRole('checkbox');
  const secondItemCheckbox = page.getByRole('listitem').filter({ hasText: 'Написати статтю' }).getByRole('checkbox');
  await expect(firstItemCheckbox).not.toBeChecked();
  await expect(secondItemCheckbox).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
