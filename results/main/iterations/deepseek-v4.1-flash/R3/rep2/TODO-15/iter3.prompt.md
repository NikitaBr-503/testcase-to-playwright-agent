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
Your previous test (attempt 2 of 5) failed when it was run.

```ts
import { test, expect } from '@playwright/test';

test('TODO-15 Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  // Scope the todo items to the main region so the filter links list is not counted
  const todoItems = page.getByRole('main').getByRole('listitem');
  const toggleAll = page.getByRole('checkbox', { name: /toggle all/i });
  const toggleAllLabel = page.getByText('Toggle All Input');

  await expect(newTodoInput).toBeVisible();
  await expect(todoItems).toHaveCount(0);

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
  // The toggle-all checkbox itself is visually hidden and positioned off-screen,
  // so it is activated through its visible label (the arrow left of the input).
  await toggleAllLabel.click();
  await expect(toggleAll).toBeChecked();
  await expect(todoItems.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();
  await expect(page.getByText(/0 items left!/)).toBeVisible();

  // Step 4
  await toggleAllLabel.click();
  await expect(toggleAll).not.toBeChecked();

  // Expected 1
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.nth(0).getByRole('checkbox')).not.toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).not.toBeChecked();

  // Expected 2
  await expect(page.getByText(/2 items left!/)).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 3
Line in the test file: 31
Error:
```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByText('Toggle All Input')
    - locator resolved to <label for="toggle-all" class="toggle-all-label">Toggle All Input</label>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <input id="toggle-all" type="checkbox" class="toggle-all" data-testid="toggle-all"/> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <input id="toggle-all" type="checkbox" class="toggle-all" data-testid="toggle-all"/> intercepts pointer events
    - retrying click action
      - waiting 100ms
    19 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <input id="toggle-all" type="checkbox" class="toggle-all" data-testid="toggle-all"/> intercepts pointer events
     - retrying click action
       - waiting 500ms


  29 |   // The toggle-all checkbox itself is visually hidden and positioned off-screen,
  30 |   // so it is activated through its visible label (the arrow left of the input).
> 31 |   await toggleAllLabel.click();
     |                        ^
  32 |   await expect(toggleAll).toBeChecked();
  33 |   await expect(todoItems.nth(0).getByRole('checkbox')).toBeChecked();
  34 |   await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep2/TODO-15.spec.ts:31:24
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
    - listitem:
      - checkbox
      - text: Написати статтю
- text: 2 items left!
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
