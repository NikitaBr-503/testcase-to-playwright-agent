Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-03
Title: Порожнє завдання не додається
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» лише кілька пробілів і натиснути Enter.
Expected results:
1. Список завдань залишається порожнім.
2. Нижня панель з лічильником і фільтрами не відображається.

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

test('TODO-03 Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const newTodoInput = page.getByPlaceholder('What needs to be done?');
  await expect(newTodoInput).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await newTodoInput.fill('   ');
  await newTodoInput.press('Enter');

  // Expected 1
  await expect(page.getByRole('listitem')).toHaveCount(0);
  await expect(newTodoInput).toHaveValue('');

  // Expected 2
  await expect(page.getByText(/\d+ items? left/)).toBeHidden();
  await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
});
```

## Execution feedback
Failed test case step: Expected 1
Line in the test file: 15
Error:
```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByPlaceholder('What needs to be done?')
Expected: ""
Received: "   "
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" getByPlaceholder('What needs to be done?') with timeout 5000ms
  - waiting for getByPlaceholder('What needs to be done?')
    14 × locator resolved to <input type="text" class="new-todo" data-testid="text-input" aria-label="New Todo Input" placeholder="What needs to be done?"/>
       - unexpected value "   "


  13 |   // Expected 1
  14 |   await expect(page.getByRole('listitem')).toHaveCount(0);
> 15 |   await expect(newTodoInput).toHaveValue('');
     |                              ^
  16 |
  17 |   // Expected 2
  18 |   await expect(page.getByText(/\d+ items? left/)).toBeHidden();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/deepseek-v4.1-flash/R3/rep3/TODO-03.spec.ts:15:30
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
