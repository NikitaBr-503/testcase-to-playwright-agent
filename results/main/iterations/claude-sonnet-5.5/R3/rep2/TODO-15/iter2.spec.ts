import { test, expect } from '../../../../../support/fixtures';
test('TODO-15: Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  const itemCheckboxes = page.getByRole('listitem').getByRole('checkbox');
  await expect(itemCheckboxes).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Step 3
  const toggleAll = page.getByTestId('toggle-all');
  await toggleAll.click();
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.nth(0)).toBeChecked();
  await expect(itemCheckboxes.nth(1)).toBeChecked();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.nth(0)).not.toBeChecked();
  await expect(itemCheckboxes.nth(1)).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
