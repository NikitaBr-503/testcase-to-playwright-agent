Convert the following manual test case into a Playwright test.

## Application
Base URL: http://localhost:7002
Start page: /
The application does not persist todos, so every test starts with an empty list.

## Manual test case
ID: TODO-07
Title: Видалення завдання
Preconditions:
- Список завдань порожній (застосунок не зберігає завдання між запусками)
Steps:
1. Ввести в поле «What needs to be done?» текст «Купити молоко» і натиснути Enter.
2. Навести курсор на завдання «Купити молоко» і натиснути кнопку видалення «×» праворуч від нього.
Expected results:
1. Завдання «Купити молоко» зникло зі списку.
2. Нижня панель з лічильником і фільтрами не відображається.
