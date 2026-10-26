Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-14
Title: Позначення всіх завдань виконаними
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Натиснути кнопку позначення всіх завдань (стрілка ліворуч від поля «What needs to be done?»).
Expected results:
1. Усі три завдання позначені як виконані.
2. Лічильник показує «0 items left!».

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

test('TODO-14: Позначення всіх завдань виконаними', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByText('items left!')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  const todoItems = page.getByRole('main').getByRole('list').first().getByRole('listitem');
  await expect(todoItems).toHaveCount(3);
  await expect(page.getByText('3 items left!')).toBeVisible();

  // Step 4
  await page.getByRole('checkbox', { name: 'Toggle All Input' }).check({ force: true });

  // Expected 1
  const items = ['Купити молоко', 'Написати статтю', 'Подзвонити керівнику'];
  for (const text of items) {
    await expect(
      todoItems.filter({ hasText: text }).getByRole('checkbox')
    ).toBeChecked();
  }

  // Expected 2
  await expect(page.getByText('0 items left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Preconditions
Line in the test file: 7
Error:
```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByText('items left!')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByText('items left!') with timeout 5000ms
  - waiting for getByText('items left!')
    14 × locator resolved to 1 element
       - unexpected value "1"


   5 |   const input = page.getByPlaceholder('What needs to be done?');
   6 |   await expect(input).toBeVisible();
>  7 |   await expect(page.getByText('items left!')).toHaveCount(0);
     |                                               ^
   8 |
   9 |   // Step 1
  10 |   await input.fill('Купити молоко');
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep1/TODO-14.spec.ts:7:47
```

Page URL at the moment of failure: http://localhost:7002/

Accessibility snapshot of the page at the moment of failure:
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
A screenshot of the page at the moment of failure is attached.

Fix the test so that it passes while still reproducing every step and verifying every expected
result of the test case. You may change how an element is located or how a step is performed,
but never remove or weaken an assertion. Return the complete corrected file.
