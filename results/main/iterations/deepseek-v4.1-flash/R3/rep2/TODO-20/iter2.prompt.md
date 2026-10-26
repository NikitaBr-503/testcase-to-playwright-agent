Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-20
Title: Масове позначення, видалення і додавання завдань
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Натиснути кнопку позначення всіх завдань (стрілка ліворуч від поля «What needs to be done?»).
5. Натиснути прапорець ліворуч від завдання «Написати статтю».
6. Натиснути кнопку «Clear completed» внизу списку.
7. Ввести в поле «What needs to be done?» текст «Підготувати презентацію» і натиснути Enter.
8. Натиснути кнопку позначення всіх завдань (стрілка ліворуч від поля «What needs to be done?»).
9. Натиснути фільтр «Completed» внизу списку.
10. Натиснути кнопку «Clear completed» внизу списку.
11. Ввести в поле «What needs to be done?» текст «Купити хліб» і натиснути Enter.
12. Натиснути фільтр «All» внизу списку.
Expected results:
1. Після кроку 6 у списку залишилося лише завдання «Написати статтю».
2. Після кроку 10 список порожній, а нижня панель з лічильником і фільтрами не відображається.
3. Після кроку 12 у списку лише завдання «Купити хліб», лічильник показує «1 item left!».

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

test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const todoItems = page.getByRole('listitem');
  // The "mark all as complete" control is the arrow left of the input (TodoMVC toggle-all)
  const toggleAll = page.locator('.toggle-all');
  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });

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
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await toggleAll.click();
  await expect(todoItems.filter({ hasText: 'Купити молоко' }).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.filter({ hasText: 'Написати статтю' }).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' }).getByRole('checkbox')).toBeChecked();

  // Step 5
  const articleTodo = todoItems.filter({ hasText: 'Написати статтю' });
  await articleTodo.getByRole('checkbox').click();
  await expect(articleTodo.getByRole('checkbox')).not.toBeChecked();

  // Step 6
  await clearCompleted.click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toHaveText('Написати статтю');

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');
  await expect(todoItems.filter({ hasText: 'Підготувати презентацію' })).toBeVisible();

  // Step 8
  await toggleAll.click();
  await expect(articleTodo.getByRole('checkbox')).toBeChecked();
  await expect(todoItems.filter({ hasText: 'Підготувати презентацію' }).getByRole('checkbox')).toBeChecked();

  // Step 9
  await page.getByRole('link', { name: 'Completed', exact: true }).click();
  await expect(todoItems).toHaveCount(2);

  // Step 10
  await clearCompleted.click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'All', exact: true })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed', exact: true })).toBeHidden();
  await expect(clearCompleted).toBeHidden();
  await expect(page.getByText(/item left/)).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');
  await expect(newTodoInput).toHaveValue('');

  // Step 12
  await page.getByRole('link', { name: 'All', exact: true }).click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toHaveText('Купити хліб');
  await expect(page.getByText(/1 item left/)).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 3
Line in the test file: 28
Error:
```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('listitem')
Expected: 3
Received: 6
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByRole('listitem') with timeout 5000ms
  - waiting for getByRole('listitem')
    14 × locator resolved to 6 elements
       - unexpected value "6"


  26 |   await newTodoInput.press('Enter');
  27 |   await expect(todoItems.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();
> 28 |   await expect(todoItems).toHaveCount(3);
     |                           ^
  29 |
  30 |   // Step 4
  31 |   await toggleAll.click();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep2/TODO-20.spec.ts:28:27
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
