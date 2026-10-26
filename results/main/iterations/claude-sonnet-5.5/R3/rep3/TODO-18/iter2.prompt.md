Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-18
Title: Повний сценарій роботи зі списком
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Ввести в поле «What needs to be done?» текст «Забронювати квиток» і натиснути Enter.
5. Натиснути прапорець ліворуч від завдання «Купити молоко».
6. Натиснути прапорець ліворуч від завдання «Забронювати квиток».
7. Двічі клацнути на тексті завдання «Написати статтю».
8. Замінити текст завдання на «Написати статтю для Scopus».
9. Натиснути Enter.
10. Натиснути фільтр «Active» внизу списку.
11. Натиснути кнопку «Clear completed» внизу списку.
12. Натиснути фільтр «All» внизу списку.
Expected results:
1. Після кроку 10 у фільтрі «Active» відображаються лише «Написати статтю для Scopus» і «Подзвонити керівнику».
2. Після кроку 12 у списку залишилися лише ці два завдання, лічильник показує «2 items left!».

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

test('TODO-18: Повний сценарій роботи зі списком', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await expect(newTodo).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

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
  await newTodo.fill('Забронювати квиток');
  await newTodo.press('Enter');
  await expect(page.getByTestId('todo-title')).toHaveCount(4);

  // Step 5
  await page.getByRole('listitem').filter({ hasText: 'Купити молоко' }).getByRole('checkbox').check();

  // Step 6
  await page.getByRole('listitem').filter({ hasText: 'Забронювати квиток' }).getByRole('checkbox').check();

  // Step 7
  await page.getByText('Написати статтю', { exact: true }).dblclick();

  // Step 8
  const editBox = page.getByRole('textbox', { name: 'Edit' });
  await expect(editBox).toBeVisible();
  await editBox.fill('Написати статтю для Scopus');

  // Step 9
  await editBox.press('Enter');
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();

  // Step 10
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику', { exact: true })).toBeVisible();
  await expect(page.getByText('Купити молоко', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Забронювати квиток', { exact: true })).toHaveCount(0);
  await expect(page.getByTestId('todo-title')).toHaveCount(2);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 2
  await expect(page.getByTestId('todo-title')).toHaveCount(2);
  await expect(page.getByText('Написати статтю для Scopus', { exact: true })).toBeVisible();
  await expect(page.getByText('Подзвонити керівнику', { exact: true })).toBeVisible();
  await expect(page.getByText('Купити молоко', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Забронювати квиток', { exact: true })).toHaveCount(0);
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 4
Line in the test file: 24
Error:
```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('todo-title')
Expected: 4
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByTestId('todo-title') with timeout 5000ms
  - waiting for getByTestId('todo-title')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  22 |   await newTodo.fill('Забронювати квиток');
  23 |   await newTodo.press('Enter');
> 24 |   await expect(page.getByTestId('todo-title')).toHaveCount(4);
     |                                                ^
  25 |
  26 |   // Step 5
  27 |   await page.getByRole('listitem').filter({ hasText: 'Купити молоко' }).getByRole('checkbox').check();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep3/TODO-18.spec.ts:24:48
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
    - listitem:
      - checkbox
      - text: Забронювати квиток
- text: 4 items left!
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
