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

test('TODO-20: Масове позначення, видалення і додавання завдань', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  const items = page.locator('.todo-list li');
  const toggleAll = page.locator('label[for="toggle-all"]');
  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  const counter = page.locator('.todo-count');

  // Preconditions
  await page.goto('/');
  await expect(newTodo).toBeVisible();
  await expect(items).toHaveCount(0);

  // Step 1
  await newTodo.fill('Купити молоко');
  await newTodo.press('Enter');

  // Step 2
  await newTodo.fill('Написати статтю');
  await newTodo.press('Enter');

  // Step 3
  await newTodo.fill('Подзвонити керівнику');
  await newTodo.press('Enter');
  await expect(items).toHaveCount(3);

  // Step 4
  await toggleAll.click();
  await expect(items.locator('input.toggle, input[type="checkbox"]')).toHaveCount(3);
  for (const item of await items.all()) {
    await expect(item.getByRole('checkbox')).toBeChecked();
  }

  // Step 5
  const articleItem = items.filter({ hasText: 'Написати статтю' });
  await articleItem.getByRole('checkbox').uncheck();

  // Step 6
  await clearCompleted.click();

  // Expected 1
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');
  await expect(page.getByText('Купити молоко')).toHaveCount(0);
  await expect(page.getByText('Подзвонити керівнику')).toHaveCount(0);

  // Step 7
  await newTodo.fill('Підготувати презентацію');
  await newTodo.press('Enter');
  await expect(items).toHaveCount(2);

  // Step 8
  await toggleAll.click();
  for (const item of await items.all()) {
    await expect(item.getByRole('checkbox')).toBeChecked();
  }

  // Step 9
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(items).toHaveCount(2);

  // Step 10
  await clearCompleted.click();

  // Expected 2
  await expect(items).toHaveCount(0);
  await expect(counter).toBeHidden();
  await expect(clearCompleted).toBeHidden();
  await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();

  // Step 11
  await newTodo.fill('Купити хліб');
  await newTodo.press('Enter');

  // Step 12
  await page.getByRole('link', { name: 'All' }).click();

  // Expected 3
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Купити хліб');
  await expect(counter).toContainText('1 item left!');
});
```

## Execution feedback
Failed test case step: Step 4
Line in the test file: 28
Error:
```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('label[for="toggle-all"]')
    - locator resolved to <label for="toggle-all" class="toggle-all-label">Toggle All Input</label>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <input id="toggle-all" type="checkbox" class="toggle-all" data-testid="toggle-all"/> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <input id="toggle-all" type="checkbox" class="toggle-all" data-testid="toggle-all"/> intercepts pointer events
    - retrying click action
      - waiting 100ms
    19 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <input id="toggle-all" type="checkbox" class="toggle-all" data-testid="toggle-all"/> intercepts pointer events
     - retrying click action
       - waiting 500ms


  26 |
  27 |   // Step 4
> 28 |   await toggleAll.click();
     |                   ^
  29 |   await expect(items.locator('input.toggle, input[type="checkbox"]')).toHaveCount(3);
  30 |   for (const item of await items.all()) {
  31 |     await expect(item.getByRole('checkbox')).toBeChecked();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep2/TODO-20.spec.ts:28:19
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
