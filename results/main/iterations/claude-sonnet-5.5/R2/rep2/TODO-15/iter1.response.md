```ts
import { test, expect } from '@playwright/test';

test('TODO-15: Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  const milk = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  const article = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await expect(milk).toBeVisible();
  await expect(article).toBeVisible();

  // Step 3
  const toggleAll = page.getByLabel('Mark all as complete');
  await toggleAll.click();
  await expect(milk.getByRole('checkbox')).toBeChecked();
  await expect(article.getByRole('checkbox')).toBeChecked();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(milk.getByRole('checkbox')).not.toBeChecked();
  await expect(article.getByRole('checkbox')).not.toBeChecked();
  await expect(milk).not.toHaveClass(/completed/);
  await expect(article).not.toHaveClass(/completed/);

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```