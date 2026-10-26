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
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  const toggleAll = page.locator('.toggle-all');
  const todoItems = page.getByRole('listitem');

  // Step 1
  await newTodoInput.fill('Купити молоко');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(1);

  // Step 2
  await newTodoInput.fill('Написати статтю');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);

  // Step 3
  await newTodoInput.fill('Подзвонити керівнику');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(3);

  // Step 4
  await toggleAll.click();
  await expect(todoItems.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(2).getByRole('checkbox')).toBeChecked();

  // Step 5
  const articleItem = todoItems.filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').click();
  await expect(articleItem.getByRole('checkbox')).not.toBeChecked();

  // Step 6
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 1
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Написати статтю');

  // Step 7
  await newTodoInput.fill('Підготувати презентацію');
  await newTodoInput.press('Enter');
  await expect(todoItems).toHaveCount(2);

  // Step 8
  await toggleAll.click();
  await expect(todoItems.nth(0).getByRole('checkbox')).toBeChecked();
  await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();

  // Step 9
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(todoItems).toHaveCount(2);

  // Step 10
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Expected 2
  await expect(todoItems).toHaveCount(0);
  await expect(page.locator('.todo-count')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();

  // Step 11
  await newTodoInput.fill('Купити хліб');
  await newTodoInput.press('Enter');

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Купити хліб');
  await expect(page.locator('.todo-count')).toHaveText(/1 item left/);
});
```

## Execution feedback
Failed test case step: Step 1
Line in the test file: 15
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


  13 |   await newTodoInput.fill('Купити молоко');
  14 |   await newTodoInput.press('Enter');
> 15 |   await expect(todoItems).toHaveCount(1);
     |                           ^
  16 |
  17 |   // Step 2
  18 |   await newTodoInput.fill('Написати статтю');
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep1/TODO-20.spec.ts:15:27
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
