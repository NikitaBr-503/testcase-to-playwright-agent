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
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // The todo list lives inside <main>; the filter links are also list items,
  // so all list-item lookups are scoped to <main>.
  const todoItems = page.getByRole('main').getByRole('listitem');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  const milkItem = todoItems.filter({ hasText: 'Купити молоко' });
  await milkItem.getByRole('checkbox').check();

  // Step 5
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(todoItems).toHaveCount(2);

  // Step 6
  const callItem = todoItems.filter({ hasText: 'Подзвонити керівнику' });
  await callItem.getByText('Подзвонити керівнику').dblclick();

  // Step 7
  const editInput = callItem.locator('.edit');
  await expect(editInput).toBeVisible();
  await editInput.fill('Подзвонити науковому керівнику');

  // Step 8
  await editInput.press('Enter');
  await expect(page.getByText('Подзвонити науковому керівнику')).toBeVisible();

  // Step 9
  const renamedItem = todoItems.filter({ hasText: 'Подзвонити науковому керівнику' });
  await renamedItem.getByRole('checkbox').check();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();
  await expect(page.getByText('Купити молоко')).toBeHidden();
  await expect(page.getByText('Подзвонити науковому керівнику')).toBeHidden();

  // Step 10
  await page.getByRole('link', { name: 'Completed' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(2);
  await expect(page.getByText('Купити молоко')).toBeVisible();
  await expect(page.getByText('Подзвонити науковому керівнику')).toBeVisible();

  // Step 11
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 9
Line in the test file: 49
Error:
```
TimeoutError: locator.check: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('main').getByRole('listitem').filter({ hasText: 'Подзвонити науковому керівнику' }).getByRole('checkbox')
    - locator resolved to <input class="toggle" type="checkbox" data-testid="todo-item-toggle"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action
    - click action done
    - waiting for scheduled navigations to finish
    - navigations have finished


  47 |   // Step 9
  48 |   const renamedItem = todoItems.filter({ hasText: 'Подзвонити науковому керівнику' });
> 49 |   await renamedItem.getByRole('checkbox').check();
     |                                           ^
  50 |
  51 |   // Expected 1
  52 |   await expect(todoItems).toHaveCount(1);
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep3/TODO-19.spec.ts:49:43
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
