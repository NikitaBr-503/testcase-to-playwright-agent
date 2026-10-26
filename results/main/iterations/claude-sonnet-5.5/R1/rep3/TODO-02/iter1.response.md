```ts
import { test, expect } from '@playwright/test';

test('TODO-02: Додавання трьох завдань', async ({ page }) => {
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
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');

  // Expected 1
  const first = page.getByText('Купити молоко', { exact: true });
  const second = page.getByText('Написати статтю', { exact: true });
  const third = page.getByText('Подзвонити керівнику', { exact: true });

  await expect(first).toBeVisible();
  await expect(second).toBeVisible();
  await expect(third).toBeVisible();

  const firstBox = await first.boundingBox();
  const secondBox = await second.boundingBox();
  const thirdBox = await third.boundingBox();
  expect(firstBox).not.toBeNull();
  expect(secondBox).not.toBeNull();
  expect(thirdBox).not.toBeNull();
  expect(firstBox!.y).toBeLessThan(secondBox!.y);
  expect(secondBox!.y).toBeLessThan(thirdBox!.y);

  // Expected 2
  await expect(page.getByText('3 items left!')).toBeVisible();
});
```