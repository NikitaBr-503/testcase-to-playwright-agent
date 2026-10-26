import { test, expect } from '../../fixtures';
import { todos } from '../../helpers/data';

test('TODO-16 Кнопка очищення відсутня без виконаних завдань', async ({ todo }) => {
  await todo.open();
  await expect(todo.items).toHaveCount(0);

  await test.step('Steps 1–2: додати два завдання', async () => {
    for (const text of [todos.milk, todos.article]) await todo.add(text);
    await expect(todo.items).toHaveText([todos.milk, todos.article]);
  });

  await test.step('Expected 1: немає кнопки «Clear completed»', async () => {
    await expect(todo.footer).toBeVisible();
    await expect(todo.clearCompleted).toHaveCount(0);
  });
  await test.step('Expected 2: лічильник «2 items left!»', async () => {
    await expect(todo.counter).toHaveText(todos.counter.two);
  });
});
