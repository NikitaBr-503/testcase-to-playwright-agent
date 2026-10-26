Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-19
Title: Редагування завдання у фільтрі «Active»
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Натиснути прапорець ліворуч від завдання «Купити молоко».
5. Натиснути фільтр «Active» внизу списку.
6. Двічі клацнути на тексті завдання «Подзвонити керівнику».
7. Замінити текст завдання на «Подзвонити науковому керівнику».
8. Натиснути Enter.
9. Натиснути прапорець ліворуч від завдання «Подзвонити науковому керівнику».
10. Натиснути фільтр «Completed» внизу списку.
11. Натиснути фільтр «All» внизу списку.
Expected results:
1. Після кроку 9 у фільтрі «Active» відображається лише завдання «Написати статтю».
2. Після кроку 10 у фільтрі «Completed» відображаються «Купити молоко» і «Подзвонити науковому керівнику».
3. Після кроку 11 лічильник показує «1 item left!».

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
