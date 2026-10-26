Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-06
Title: Зняття позначки виконання
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Натиснути прапорець ліворуч від завдання «Купити молоко».
3. Натиснути прапорець ліворуч від завдання «Купити молоко».
Expected results:
1. Завдання «Купити молоко» не позначене як виконане.
2. Лічильник показує «1 item left!».
