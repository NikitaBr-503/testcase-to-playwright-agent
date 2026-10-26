Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-14
Title: Позначення всіх завдань виконаними
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Натиснути кнопку позначення всіх завдань (стрілка ліворуч від поля «What needs to be done?»).
Expected results:
1. Усі три завдання позначені як виконані.
2. Лічильник показує «0 items left!».

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

test('TODO-14 Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();

  const todos = ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику'];

  // Step 1
  await newTodo.fill(todos[0]);
  await newTodo.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: todos[0] })).toBeVisible();

  // Step 2
  await newTodo.fill(todos[1]);
  await newTodo.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: todos[1] })).toBeVisible();

  // Step 3
  await newTodo.fill(todos[2]);
  await newTodo.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: todos[2] })).toBeVisible();

  // Step 4
  await page.getByLabel('Mark all as complete').click();

  // Expected 1
  for (const title of todos) {
    const item = page.getByRole('listitem').filter({ hasText: title });
    await expect(item.getByRole('checkbox')).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 4
Line in the test file: 26
Error:
```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByLabel('Mark all as complete')


  24 |
  25 |   // Step 4
> 26 |   await page.getByLabel('Mark all as complete').click();
     |                                                 ^
  27 |
  28 |   // Expected 1
  29 |   for (const title of todos) {
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep3/TODO-14.spec.ts:26:49
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
    - listitem:
      - checkbox
      - text: Подзвонити керівнику
- text: 3 items left!
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
