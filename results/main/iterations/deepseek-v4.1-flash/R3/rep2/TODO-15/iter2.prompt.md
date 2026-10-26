Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-15
Title: Зняття позначки з усіх завдань
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Натиснути кнопку позначення всіх завдань (стрілка ліворуч від поля «What needs to be done?»).
4. Ще раз натиснути ту саму кнопку.
Expected results:
1. Жодне завдання не позначене як виконане.
2. Лічильник показує «2 items left!».

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

test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.getByRole('listitem');
  const itemCheckboxes = todoItems.getByRole('checkbox');
  const toggleAll = page.getByRole('checkbox', { name: /toggle all|mark all as complete/i });

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await toggleAll.check();
  await expect(toggleAll).toBeChecked();
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.first()).toBeChecked();
  await expect(itemCheckboxes.nth(1)).toBeChecked();
  await expect(page.getByText('0 items left!')).toBeVisible();

  // Step 4
  await toggleAll.uncheck();
  await expect(toggleAll).not.toBeChecked();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.first()).not.toBeChecked();
  await expect(itemCheckboxes.nth(1)).not.toBeChecked();
  await expect(page.locator('li.completed')).toHaveCount(0);

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 1
Line in the test file: 16
Error:
```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('listitem')
Expected: 1
Received: 4
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByRole('listitem') with timeout 5000ms
  - waiting for getByRole('listitem')
    14 × locator resolved to 4 elements
       - unexpected value "4"


  14 |   await newTodoInput.fill('Купити молоко');
  15 |   await newTodoInput.press('Enter');
> 16 |   await expect(todoItems).toHaveCount(1);
     |                           ^
  17 |   await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();
  18 |
  19 |   // Step 2
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep2/TODO-15.spec.ts:16:27
```

Page URL at the moment of failure: http://localhost:7002/

Accessibility snapshot of the page at the moment of failure:
```yaml
- heading "todos" [level=1]
- textbox "New Todo Input":
  - /placeholder: What needs to be done?
- main:
  - checkbox "❯ Toggle All Input"
  - text: ❯ Toggle All Input
  - list:
    - listitem:
      - checkbox
      - text: Купити молоко
- text: 1 item left!
- list:
  - listitem:
    - link "All":
      - /url: "#/"
  - listitem:
    - link "Active":
      - /url: "#/active"
  - listitem:
    - link "Completed":
      - /url: "#/completed"
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
