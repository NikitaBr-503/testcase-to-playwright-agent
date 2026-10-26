Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-12
Title: Повернення до перегляду всіх завдань
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Ввести в поле «What needs to be done?» текст «Написати статтю» і натиснути Enter.
3. Натиснути прапорець ліворуч від завдання «Купити молоко».
4. Натиснути фільтр «Completed» внизу списку.
5. Натиснути фільтр «All» внизу списку.
Expected results:
1. Відображаються обидва завдання: «Купити молоко» і «Написати статтю».
2. Лічильник показує «1 item left!».
