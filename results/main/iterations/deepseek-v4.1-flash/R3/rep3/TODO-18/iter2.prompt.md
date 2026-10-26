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
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

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
  await newTodoInput.fill('Забронювати квиток');
  await newTodoInput.press('Enter');
  await expect(page.getByRole('listitem')).toHaveCount(4);

  // Step 5
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Купити молоко' })
    .getByRole('checkbox')
    .check();

  // Step 6
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Забронювати квиток' })
    .getByRole('checkbox')
    .check();

  // Step 7
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Написати статтю' })
    .locator('label')
    .dblclick();

  // Step 8
  const editInput = page.locator('li.editing').getByRole('textbox');
  await expect(editInput).toBeVisible();
  await editInput.fill('Написати статтю для Scopus');

  // Step 9
  await editInput.press('Enter');
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Написати статтю для Scopus' })
  ).toBeVisible();

  // Step 10
  await page.getByRole('link', { name: 'Active' }).click();

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Написати статтю для Scopus' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Купити молоко' })
  ).toHaveCount(0);
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Забронювати квиток' })
  ).toHaveCount(0);

  // Step 11
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 2
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Написати статтю для Scopus' })
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Подзвонити керівнику' })
  ).toBeVisible();
  await expect(page.getByText(/2 items left/)).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 4
Line in the test file: 27
Error:
```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('listitem')
Expected: 4
Received: 7
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByRole('listitem') with timeout 5000ms
  - waiting for getByRole('listitem')
    14 × locator resolved to 7 elements
       - unexpected value "7"


  25 |   await newTodoInput.fill('Забронювати квиток');
  26 |   await newTodoInput.press('Enter');
> 27 |   await expect(page.getByRole('listitem')).toHaveCount(4);
     |                                            ^
  28 |
  29 |   // Step 5
  30 |   await page
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep3/TODO-18.spec.ts:27:44
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
