Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-08
Title: Редагування завдання подвійним клацанням
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
2. Двічі клацнути на тексті завдання «Написати статтю».
3. Замінити текст завдання на «Написати статтю для Scopus».
4. Натиснути Enter.
Expected results:
1. У списку відображається завдання «Написати статтю для Scopus».
2. Завдання «Написати статтю» без доповнення у списку немає.
