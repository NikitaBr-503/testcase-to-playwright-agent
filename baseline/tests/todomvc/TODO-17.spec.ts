import { test, expect } from '../../fixtures';
import { todos } from '../../helpers/data';

test('TODO-17 Видалення виконаного завдання у фільтрі «Completed»', async ({ todo }) => {
  await todo.open();
  await expect(todo.items).toHaveCount(0);

  await test.step('Steps 1–3: додати три завдання', async () => {
    for (const text of [todos.milk, todos.article, todos.call]) await todo.add(text);
    await expect(todo.items).toHaveCount(3);
  });
  await test.step('Steps 4–5: позначити два завдання', async () => {
    await todo.toggle(todos.milk);
    await todo.toggle(todos.article);
  });
  await test.step('Step 6: фільтр «Completed»', async () => {
    await todo.showFilter('Completed');
    await expect(todo.items).toHaveText([todos.milk, todos.article]);
  });
  await test.step('Step 7: видалити «Купити молоко»', () => todo.remove(todos.milk));

  await test.step('Expected 1: у фільтрі лише «Написати статтю»', async () => {
    await expect(todo.items).toHaveText([todos.article]);
  });
  await test.step('Expected 2: лічильник «1 item left!»', async () => {
    await expect(todo.counter).toHaveText(todos.counter.one);
  });
});
