import { test, expect } from '../../fixtures';
import { todos } from '../../helpers/data';

test('TODO-10 Фільтр активних завдань', async ({ todo, page }) => {
  await todo.open();
  await expect(todo.items).toHaveCount(0);

  await test.step('Steps 1–3: додати три завдання', async () => {
    for (const text of [todos.milk, todos.article, todos.call]) await todo.add(text);
    await expect(todo.items).toHaveCount(3);
  });
  await test.step('Step 4: позначити «Написати статтю»', () => todo.toggle(todos.article));
  await test.step('Step 5: фільтр «Active»', () => todo.showFilter('Active'));

  await test.step('Expected 1: лише активні завдання', async () => {
    await expect(todo.items).toHaveText([todos.milk, todos.call]);
  });
  await test.step('Expected 2: адреса #/active, фільтр виділено', async () => {
    await expect(page).toHaveURL(/#\/active$/);
    await expect(todo.filter('Active')).toHaveClass(/selected/);
  });
});
