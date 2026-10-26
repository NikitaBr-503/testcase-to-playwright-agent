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
Your previous test (attempt 1 of 5) failed when it was run.

```ts
import { test, expect } from '@playwright/test';

test('TODO-17: Видалення виконаного завдання у фільтрі «Completed»', async ({ page }) => {
  // Preconditions
  await page.goto('/');
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();

  const items = page.getByRole('listitem');
  const milk = items.filter({ hasText: 'Купити молоко' });
  const article = items.filter({ hasText: 'Написати статтю' });

  // Step 1
  await input.fill('Купити молоко');
  await input.press('Enter');
  await expect(milk).toBeVisible();

  // Step 2
  await input.fill('Написати статтю');
  await input.press('Enter');
  await expect(article).toBeVisible();

  // Step 3
  await input.fill('Подзвонити керівнику');
  await input.press('Enter');
  await expect(items.filter({ hasText: 'Подзвонити керівнику' })).toBeVisible();

  // Step 4
  await milk.getByRole('checkbox').check();
  await expect(milk.getByRole('checkbox')).toBeChecked();

  // Step 5
  await article.getByRole('checkbox').check();
  await expect(article.getByRole('checkbox')).toBeChecked();

  // Step 6
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(milk).toBeVisible();
  await expect(article).toBeVisible();

  // Step 7
  await milk.hover();
  await milk.getByRole('button').click();

  // Expected 1
  await expect(milk).toHaveCount(0);
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Написати статтю');

  // Expected 2
  await expect(page.getByText('1 item left!')).toBeVisible();
});
```

## Execution feedback
Failed test case step: Expected 1
Line in the test file: 46
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


  44 |   // Expected 1
  45 |   await expect(milk).toHaveCount(0);
> 46 |   await expect(items).toHaveCount(1);
     |                       ^
  47 |   await expect(items.first()).toContainText('Написати статтю');
  48 |
  49 |   // Expected 2
    at /Users/nbryk/Desktop/university/звіт аспірантура/Scopus project/App/testcase-to-playwright-agent/generated/main/claude-sonnet-5.5/R3/rep1/TODO-17.spec.ts:46:23
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
      - text: Написати статтю
      - button "Delete todo": ×
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
