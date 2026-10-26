Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-10
Title: Фільтр активних завдань
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Ввести в поле «What needs to be done?» текст «Подзвонити керівнику» і натиснути Enter.
4. Натиснути прапорець ліворуч від завдання «Написати статтю».
5. Натиснути фільтр «Active» внизу списку.
Expected results:
1. Відображаються лише завдання «Купити молоко» і «Подзвонити керівнику».
2. Адреса сторінки закінчується на «#/active», фільтр «Active» виділено.
