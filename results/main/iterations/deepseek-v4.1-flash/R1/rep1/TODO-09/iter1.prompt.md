Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-09
Title: Видалення завдання через очищення тексту під час редагування
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Двічі клацнути на тексті завдання «Купити молоко».
4. Видалити весь текст завдання.
5. Натиснути Enter.
Expected results:
1. Завдання «Купити молоко» зникло зі списку.
2. У списку залишилося лише завдання «Написати статтю», лічильник показує «1 item left!».
