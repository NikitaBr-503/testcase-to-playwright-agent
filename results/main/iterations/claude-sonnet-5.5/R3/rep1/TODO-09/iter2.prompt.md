Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-09
Title: Видалення завдання через очищення тексту під час редагування
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Двічі клацнути на тексті завдання «Купити молоко».
4. Видалити весь текст завдання.
5. Натиснути Enter.
Expected results:
1. Завдання «Купити молоко» зникло зі списку.
2. У списку залишилося лише завдання «Написати статтю», лічильник показує «1 item left!».

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

test('TODO-09: Видалення завдання через очищення тексту під час редагування', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByRole('listitem').filter({ has: page.getByRole('checkbox') })).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Step 3
  await page.getByText('Купити молоко').dblclick();
  const editInput = page.getByRole('textbox', { name: 'Edit' });
  await expect(editInput).toBeVisible();

  // Step 4
  await editInput.fill('');

  // Step 5
  await editInput.press('Enter');

  // Expected 1
  await expect(page.getByText('Купити молоко')).toHaveCount(0);

  // Expected 2
  await expect(page.getByText('Написати статтю')).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'Toggle Todo' })).toHaveCount(1);
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Expected 2
Line in the test file: 35
Error:
```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('checkbox', { name: 'Toggle Todo' })
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByRole('checkbox', { name: 'Toggle Todo' }) with timeout 5000ms
  - waiting for getByRole('checkbox', { name: 'Toggle Todo' })
    14 × locator resolved to 0 elements
       - unexpected value "0"


  33 |   // Expected 2
  34 |   await expect(page.getByText('Написати статтю')).toBeVisible();
> 35 |   await expect(page.getByRole('checkbox', { name: 'Toggle Todo' })).toHaveCount(1);
     |                                                                     ^
  36 |   await expect(page.getByText('1 item left!')).toBeVisible();
  37 | });
  38 |
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep1/TODO-09.spec.ts:35:69
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
      - text: Написати статтю
      - button "Delete todo": ×
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
