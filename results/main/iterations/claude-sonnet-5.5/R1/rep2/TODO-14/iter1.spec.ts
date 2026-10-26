import { test, expect } from '../../../../../support/fixtures';
test('TODO-14: Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();

  const titles = ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику'];

  // Step 1
  await input.fill(titles[0]);
  await input.press('Enter');

  // Step 2
  await input.fill(titles[1]);
  await input.press('Enter');

  // Step 3
  await input.fill(titles[2]);
  await input.press('Enter');

  for (const title of titles) {
    await expect(page.getByText(title)).toBeVisible();
  }

  // Step 4
  await page.getByLabel('Mark all as complete').check();

  // Expected 1
  for (const title of titles) {
    const item = page.getByRole('listitem').filter({ hasText: title });
    await expect(item.getByRole('checkbox')).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
