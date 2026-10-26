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
Your previous test (attempt 2 of 5) failed when it was run.

```ts
import { test, expect } from '@playwright/test';

test('TODO-19 Редагування завдання у фільтрі «Active»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('textbox', { name: 'New Todo Input' })).toBeVisible();

  const newTodoInput = page.getByRole('textbox', { name: 'New Todo Input' });
  const todoList = page.getByRole('main').getByRole('listitem');
  const milkItem = todoList.filter({ hasText: 'Купити молоко' });
  const articleItem = todoList.filter({ hasText: 'Написати статтю' });
  const chiefItem = todoList.filter({ hasText: 'Подзвонити науковому керівнику' });

  await expect(todoList).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(milkItem).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(articleItem).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoList).toHaveCount(3);

  // Step 4
  await milkItem.getByRole('checkbox').check();
  await expect(milkItem.getByRole('checkbox')).toBeChecked();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page).toHaveURL(/#\/active$/);
  await expect(todoList).toHaveCount(2);
  await expect(chiefItem).toBeVisible();

  // Step 6
  await chiefItem.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = page.locator('li.editing').locator('.edit');
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');
  await expect(chiefItem).toBeVisible();
  await expect(chiefItem.getByText('Подзвонити науковому керівнику')).toBeVisible();

  // Step 9
  await chiefItem.getByRole('checkbox').click({ force: true });

  // Expected 1
  await expect(todoList).toHaveCount(1);
  await expect(articleItem).toBeVisible();
  await expect(todoList.filter({ hasText: 'Подзвонити науковому керівнику' })).toHaveCount(0);

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page).toHaveURL(/#\/completed$/);

  // Expected 2
  await expect(todoList).toHaveCount(2);
  await expect(milkItem).toBeVisible();
  await expect(chiefItem).toBeVisible();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();
  await expect(page).toHaveURL(/#\/$/);

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 5
Line in the test file: 38
Error:
```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('main').getByRole('listitem').filter({ hasText: 'Подзвонити науковому керівнику' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('main').getByRole('listitem').filter({ hasText: 'Подзвонити науковому керівнику' }) with timeout 5000ms
  - waiting for getByRole('main').getByRole('listitem').filter({ hasText: 'Подзвонити науковому керівнику' })


  36 |   await expect(page).toHaveURL(/#\/active$/);
  37 |   await expect(todoList).toHaveCount(2);
> 38 |   await expect(chiefItem).toBeVisible();
     |                           ^
  39 |
  40 |   // Step 6
  41 |   await chiefItem.getByText('Подзвонити керівнику').dblclick();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep2/TODO-19.spec.ts:38:27
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
    - listitem:
      - checkbox
      - text: Подзвонити керівнику
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
