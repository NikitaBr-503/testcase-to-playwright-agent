Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-11
Title: Фільтр виконаних завдань
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Натиснути прапорець ліворуч від завдання «Написати статтю».
5. Натиснути фільтр «Completed» внизу списку.
Expected results:
1. Відображається лише завдання «Написати статтю».
2. Адреса сторінки закінчується на «#/completed».

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

test('TODO-11 Фільтр виконаних завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  const articleTodo = page.getByRole('listitem').filter({ hasText: 'Написати статтю' });
  await articleTodo.getByRole('checkbox').check();
  await expect(articleTodo.getByRole('checkbox')).toBeChecked();

  // Step 5
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 1
  await expect(page.getByRole('listitem').filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeHidden();
  await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toBeHidden();
  await expect(page.getByRole('listitem')).toHaveCount(1);

  // Expected 2
  await expect(page).toHaveURL(/#\/completed$/);
});
```

## Execution feedback
Failed test case step: Expected 1
Line in the test file: 37
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


  35 |   await expect(page.getByRole('listitem').filter({ hasText: 'Купити молоко' })).toBeHidden();
  36 |   await expect(page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })).toBeHidden();
> 37 |   await expect(page.getByRole('listitem')).toHaveCount(1);
     |                                            ^
  38 |
  39 |   // Expected 2
  40 |   await expect(page).toHaveURL(/#\/completed$/);
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep3/TODO-11.spec.ts:37:44
```

Page URL at the moment of failure: http://localhost:7002/#/completed

Accessibility snapshot of the page at the moment of failure:
```yaml
- heading "todos" [level=1]
- textbox "New Todo Input":
  - /placeholder: What needs to be done?
- main:
  - checkbox "❯ Toggle All Input" [checked]
  - text: ❯ Toggle All Input
  - list:
    - listitem:
      - checkbox [checked]
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
- button "Clear completed"
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
