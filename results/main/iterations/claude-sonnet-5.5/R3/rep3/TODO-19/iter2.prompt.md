Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-19
Title: Редагування завдання у фільтрі «Active»
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Натиснути прапорець ліворуч від завдання «Купити молоко».
5. Натиснути фільтр «Active» внизу списку.
6. Двічі клацнути на тексті завдання «Подзвонити керівнику».
7. Замінити текст завдання на «Подзвонити науковому керівнику».
8. Натиснути Enter.
9. Натиснути прапорець ліворуч від завдання «Подзвонити науковому керівнику».
10. Натиснути фільтр «Completed» внизу списку.
11. Натиснути фільтр «All» внизу списку.
Expected results:
1. Після кроку 9 у фільтрі «Active» відображається лише завдання «Написати статтю».
2. Після кроку 10 у фільтрі «Completed» відображаються «Купити молоко» і «Подзвонити науковому керівнику».
3. Після кроку 11 лічильник показує «1 item left!».

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

test('TODO-19: Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  const list = page.getByRole('list').filter({ has: page.getByRole('listitem') });
  await expect(newTodo).toBeVisible();

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');

  // Step 4
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .click();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();

  // Step 6
  await page.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = page.getByRole('textbox', { name: 'Edit' });
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');

  // Step 9
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Подзвонити науковому керівнику' })
    .getByRole('checkbox')
    .click();

  // Expected 1
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(items).toHaveCount(2);
  await expect(items.filter({ hasText: 'Купити молоко' })).toHaveCount(1);
  await expect(items.filter({ hasText: 'Подзвонити науковому керівнику' })).toHaveCount(1);

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Expected 1
Line in the test file: 51
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


  49 |   // Expected 1
  50 |   const items = page.getByRole('listitem');
> 51 |   await expect(items).toHaveCount(1);
     |                       ^
  52 |   await expect(items.first()).toContainText('Написати статтю');
  53 |
  54 |   // Step 10
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep3/TODO-19.spec.ts:51:23
```

Page URL at the moment of failure: http://localhost:7002/#/active

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
