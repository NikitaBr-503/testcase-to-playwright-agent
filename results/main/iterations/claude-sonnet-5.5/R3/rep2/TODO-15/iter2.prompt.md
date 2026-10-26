Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-15
Title: Зняття позначки з усіх завдань
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Натиснути кнопку позначення всіх завдань (стрілка ліворуч від поля «What needs to be done?»).
4. Ще раз натиснути ту саму кнопку.
Expected results:
1. Жодне завдання не позначене як виконане.
2. Лічильник показує «2 items left!».

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

test('TODO-15: Зняття позначки з усіх завдань', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();
  await expect(page.getByRole('list').getByRole('checkbox')).toHaveCount(0);

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  await expect(page.getByText('Купити молоко')).toBeVisible();

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');
  await expect(page.getByText('Написати статтю')).toBeVisible();

  // Step 3
  const toggleAll = page.getByText('Toggle All Input');
  const itemCheckboxes = page.getByRole('list').getByRole('checkbox');
  await toggleAll.click();
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.nth(0)).toBeChecked();
  await expect(itemCheckboxes.nth(1)).toBeChecked();

  // Step 4
  await toggleAll.click();

  // Expected 1
  await expect(itemCheckboxes).toHaveCount(2);
  await expect(itemCheckboxes.nth(0)).not.toBeChecked();
  await expect(itemCheckboxes.nth(1)).not.toBeChecked();

  // Expected 2
  await expect(page.getByText('2 items left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Step 3
Line in the test file: 22
Error:
```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByText('Toggle All Input')
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


  20 |   const toggleAll = page.getByText('Toggle All Input');
  21 |   const itemCheckboxes = page.getByRole('list').getByRole('checkbox');
> 22 |   await toggleAll.click();
     |                   ^
  23 |   await expect(itemCheckboxes).toHaveCount(2);
  24 |   await expect(itemCheckboxes.nth(0)).toBeChecked();
  25 |   await expect(itemCheckboxes.nth(1)).toBeChecked();
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep2/TODO-15.spec.ts:22:19
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
