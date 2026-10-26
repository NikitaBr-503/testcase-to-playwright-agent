Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-07
Title: Видалення завдання
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Навести курсор на завдання «Купити молоко» і натиснути кнопку видалення «×» праворуч від нього.
Expected results:
1. Завдання «Купити молоко» зникло зі списку.
2. Нижня панель з лічильником і фільтрами не відображається.

## Accessibility snapshot of the start page (http://localhost:7002/)
This is how the start page looked before the test, in Playwright's ARIA snapshot format
(if the page opens with dialogs, a second snapshot shows the page after they were closed):
```yaml
- heading "todos" [level=1]
- textbox "New Todo Input":
  - /placeholder: What needs to be done?
- contentinfo:
  - paragraph: Double-click to edit a todo
  - paragraph: Created by the TodoMVC Team
  - paragraph:
    - text: Part of
    - link "TodoMVC":
      - /url: http://todomvc.com
```


## Previous attempt
Your previous test (attempt 1 of 5) failed when it was run.

```ts
import { test, expect } from '@playwright/test';

test('TODO-07 Видалення завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Купити молоко' });
  await expect(todoItem).toBeVisible();

  // Step 2
  await todoItem.hover();
  await todoItem.getByRole('button').click();

  // Expected 1
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toHaveCount(0);
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Expected 2
  await expect(page.locator('.footer')).toHaveCount(0);
  await expect(page.getByText(/item(s)? left/)).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Active' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Completed' })).toHaveCount(0);
});
```

## Execution feedback
Failed test case step: Expected 2
Line in the test file: 24
Error:
```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.footer')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" locator('.footer') with timeout 5000ms
  - waiting for locator('.footer')
    14 × locator resolved to 1 element
       - unexpected value "1"


  22 |
  23 |   // Expected 2
> 24 |   await expect(page.locator('.footer')).toHaveCount(0);
     |                                         ^
  25 |   await expect(page.getByText(/item(s)? left/)).toHaveCount(0);
  26 |   await expect(page.getByRole('link', { name: 'Active' })).toHaveCount(0);
  27 |   await expect(page.getByRole('link', { name: 'Completed' })).toHaveCount(0);
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep1/TODO-07.spec.ts:24:41
```

Page URL at the moment of failure: http://localhost:7002/

Accessibility snapshot of the page at the moment of failure:
```yaml
- heading "todos" [level=1]
- textbox "New Todo Input":
  - /placeholder: What needs to be done?
- contentinfo:
  - paragraph: Double-click to edit a todo
  - paragraph: Created by the TodoMVC Team
  - paragraph:
    - text: Part of
    - link "TodoMVC":
      - /url: http://todomvc.com
```
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
