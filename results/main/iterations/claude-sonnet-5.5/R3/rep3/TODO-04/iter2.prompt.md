Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-04
Title: Обрізання пробілів на початку і в кінці завдання
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «   Купити хліб   » (з пробілами на початку і в кінці) і натиснути Enter.
Expected results:
1. У списку відображається завдання з текстом «Купити хліб» без пробілів на початку і в кінці.
2. Поле «What needs to be done?» після додавання порожнє.

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

test('TODO-04: Обрізання пробілів на початку і в кінці завдання', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);

  // Step 1
  await input.fill('   Купити хліб   ');
  await input.press('Enter');

  // Expected 1
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(1);
  const label = items.first().getByText('Купити хліб');
  await expect(label).toBeVisible();
  const text = await label.textContent();
  expect(text).toBe('Купити хліб');
  expect(text).toBe(text?.trim());

  // Expected 2
  await expect(input).toHaveValue('');
});
```

## Execution feedback
Failed test case step: Expected 1
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


  13 |   // Expected 1
  14 |   const items = page.getByRole('listitem');
> 15 |   await expect(items).toHaveCount(1);
     |                       ^
  16 |   const label = items.first().getByText('Купити хліб');
  17 |   await expect(label).toBeVisible();
  18 |   const text = await label.textContent();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep3/TODO-04.spec.ts:15:23
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
      - text: Купити хліб
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
