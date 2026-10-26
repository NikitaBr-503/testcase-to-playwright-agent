import { test, expect } from '../../fixtures';
import { todos } from '../../helpers/data';

test('TODO-20 Масове позначення, видалення і додавання завдань', async ({ todo }) => {
  await todo.open();
  await expect(todo.items).toHaveCount(0);

  await test.step('Steps 1–3: додати три завдання', async () => {
    for (const text of [todos.milk, todos.article, todos.call]) await todo.add(text);
    await expect(todo.items).toHaveCount(3);
  });
  await test.step('Step 4: позначити всі', async () => {
    await todo.toggleAll.click();
    await expect(todo.items.getByRole('checkbox', { checked: true })).toHaveCount(3);
  });
  await test.step('Step 5: зняти позначку з «Написати статтю»', () => todo.toggle(todos.article));
  await test.step('Step 6: Clear completed', () => todo.clearCompleted.click());
  await test.step('Expected 1: залишилося лише «Написати статтю»', async () => {
    await expect(todo.items).toHaveText([todos.article]);
  });

  await test.step('Step 7: додати «Підготувати презентацію»', () => todo.add(todos.presentation));
  await test.step('Step 8: позначити всі', async () => {
    await todo.toggleAll.click();
    await expect(todo.items.getByRole('checkbox', { checked: true })).toHaveCount(2);
  });
  await test.step('Step 9: фільтр «Completed»', () => todo.showFilter('Completed'));
  await test.step('Step 10: Clear completed', () => todo.clearCompleted.click());
  await test.step('Expected 2: список порожній, нижньої панелі немає', async () => {
    await expect(todo.items).toHaveCount(0);
    await expect(todo.footer).toBeHidden();
  });

  await test.step('Step 11: додати «Купити хліб»', () => todo.add(todos.bread));
  await test.step('Step 12: фільтр «All»', () => todo.showFilter('All'));
  await test.step('Expected 3: лише «Купити хліб», лічильник «1 item left!»', async () => {
    await expect(todo.items).toHaveText([todos.bread]);
    await expect(todo.counter).toHaveText(todos.counter.one);
  });
});
