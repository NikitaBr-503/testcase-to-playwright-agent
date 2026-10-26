```ts
import { test, expect } from '@playwright/test';

test('TODO-05 Позначення завдання виконаним', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  const itemText = page.getByText('Купити молоко', { exact: true });
  await expect(itemText).toBeVisible();

  // Step 2
  const checkbox = page.getByRole('checkbox').first();
  await checkbox.check();

  // Expected 1
  await expect(checkbox).toBeChecked();
  await expect
    .poll(async () =>
      itemText.evaluate((el) => {
        let node: Element | null = el;
        while (node) {
          const style = getComputedStyle(node);
          if (style.textDecorationLine.includes('line-through')) {
            return true;
          }
          node = node.parentElement;
        }
        return false;
      })
    )
    .toBe(true);

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```