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
