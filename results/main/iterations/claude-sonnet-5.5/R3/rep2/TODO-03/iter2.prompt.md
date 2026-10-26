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

test('TODO-03: Порожнє завдання не додається', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  // Step 1
  await input.fill('   ');
  await input.press('Enter');

  // Expected 1
  await expect(page.getByTestId('todo-item')).toHaveCount(0);
  await expect(page.getByRole('listitem').filter({ hasNot: page.locator('p, a') })).toHaveCount(0);

  // Expected 2
  await expect(page.getByText(/items? left/)).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'All', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Active', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Completed', exact: true })).toHaveCount(0);
});
```

## Execution feedback
Failed test case step: Expected 2
Line in the test file: 18
Error:
```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByText(/items? left/)
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByText(/items? left/) with timeout 5000ms
  - waiting for getByText(/items? left/)
    14 × locator resolved to 1 element
       - unexpected value "1"


  16 |
  17 |   // Expected 2
> 18 |   await expect(page.getByText(/items? left/)).toHaveCount(0);
     |                                               ^
  19 |   await expect(page.getByRole('link', { name: 'All', exact: true })).toHaveCount(0);
  20 |   await expect(page.getByRole('link', { name: 'Active', exact: true })).toHaveCount(0);
  21 |   await expect(page.getByRole('link', { name: 'Completed', exact: true })).toHaveCount(0);
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep2/TODO-03.spec.ts:18:47
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
