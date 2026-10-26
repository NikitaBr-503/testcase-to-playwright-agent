Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-17
Title: Видалення виконаного завдання у фільтрі «Completed»
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Натиснути прапорець ліворуч від завдання «Купити молоко».
5. Натиснути прапорець ліворуч від завдання «Написати статтю».
6. Натиснути фільтр «Completed» внизу списку.
7. Навести курсор на завдання «Купити молоко» і натиснути кнопку видалення «×» праворуч від нього.
Expected results:
1. У фільтрі «Completed» залишилося лише завдання «Написати статтю».
2. Лічильник показує «1 item left!».

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

test('TODO-17: Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  // The footer contains its own list of filter links, so scope the todo items to the main list
  const todoItems = page.getByRole('main').getByRole('listitem');
  await expect(todoItems).toHaveCount(0);
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  const milkTodo = todoItems.filter({ hasText: 'Купити молоко' });
  await milkTodo.getByRole('checkbox').check();
  await expect(milkTodo.getByRole('checkbox')).toBeChecked();

  // Step 5
  const articleTodo = todoItems.filter({ hasText: 'Написати статтю' });
  await articleTodo.getByRole('checkbox').check();
  await expect(articleTodo.getByRole('checkbox')).toBeChecked();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page).toHaveURL(/#\/completed$/);
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toBeVisible();
  await expect(todoItems.filter({ hasText: 'Написати статтю' })).toBeVisible();

  // Step 7
  // The delete control is an icon-only button ("×") placed to the right of the todo text
  await milkTodo.hover();
  const deleteButton = milkTodo.getByRole('button', { name: '×' });
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toContainText('Написати статтю');
  await expect(todoItems.filter({ hasText: 'Купити молоко' })).toHaveCount(0);

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 7
Line in the test file: 48
Error:
```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('main').getByRole('listitem').filter({ hasText: 'Купити молоко' }).getByRole('button', { name: '×' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('main').getByRole('listitem').filter({ hasText: 'Купити молоко' }).getByRole('button', { name: '×' }) with timeout 5000ms
  - waiting for getByRole('main').getByRole('listitem').filter({ hasText: 'Купити молоко' }).getByRole('button', { name: '×' })


  46 |   await milkTodo.hover();
  47 |   const deleteButton = milkTodo.getByRole('button', { name: '×' });
> 48 |   await expect(deleteButton).toBeVisible();
     |                              ^
  49 |   await deleteButton.click();
  50 |
  51 |   // Expected 1
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep1/TODO-17.spec.ts:48:30
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
      - text: Купити молоко
      - button "Delete todo": ×
    - listitem:
      - checkbox [checked]
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
