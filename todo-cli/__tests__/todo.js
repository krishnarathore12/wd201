/* eslint-disable no-undef */
const todoList = require("../todo");

describe("Todo List Test Suite", () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  test("Should add new todo", () => {
    const todoItemsCount = todos.all.length;
    todos.add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(todos.all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    todos.add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    // Create date for yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];

    // Create date for today
    const today = new Date().toISOString().split("T")[0];

    // Create date for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];

    // Add todos with different due dates
    todos.add({
      title: "Overdue todo",
      completed: false,
      dueDate: yesterdayDate,
    });
    todos.add({
      title: "Due today todo",
      completed: false,
      dueDate: today,
    });
    todos.add({
      title: "Due tomorrow todo",
      completed: false,
      dueDate: tomorrowDate,
    });

    // Get overdue items
    const overdueItems = todos.overdue();

    // Verify that only the overdue todo is returned
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("Overdue todo");
    expect(overdueItems[0].dueDate).toBe(yesterdayDate);
  });

  test("Should retrieve due today items", () => {
    // Create date for yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];

    // Create date for today
    const today = new Date().toISOString().split("T")[0];

    // Create date for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];

    // Add todos with different due dates
    todos.add({
      title: "Overdue todo",
      completed: false,
      dueDate: yesterdayDate,
    });
    todos.add({
      title: "Due today todo 1",
      completed: false,
      dueDate: today,
    });
    todos.add({
      title: "Due today todo 2",
      completed: true,
      dueDate: today,
    });
    todos.add({
      title: "Due tomorrow todo",
      completed: false,
      dueDate: tomorrowDate,
    });

    // Get due today items
    const dueTodayItems = todos.dueToday();

    // Verify that only the due today todos are returned
    expect(dueTodayItems.length).toBe(2);
    expect(dueTodayItems[0].title).toBe("Due today todo 1");
    expect(dueTodayItems[0].dueDate).toBe(today);
    expect(dueTodayItems[1].title).toBe("Due today todo 2");
    expect(dueTodayItems[1].dueDate).toBe(today);
  });

  test("Should retrieve due later items", () => {
    // Create date for yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];

    // Create date for today
    const today = new Date().toISOString().split("T")[0];

    // Create date for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];

    // Add todos with different due dates
    todos.add({
      title: "Overdue todo",
      completed: false,
      dueDate: yesterdayDate,
    });
    todos.add({
      title: "Due today todo",
      completed: false,
      dueDate: today,
    });
    todos.add({
      title: "Due tomorrow todo 1",
      completed: false,
      dueDate: tomorrowDate,
    });
    todos.add({
      title: "Due tomorrow todo 2",
      completed: true,
      dueDate: tomorrowDate,
    });

    // Get due later items
    const dueLaterItems = todos.dueLater();

    // Verify that only the due later todos are returned
    expect(dueLaterItems.length).toBe(2);
    expect(dueLaterItems[0].title).toBe("Due tomorrow todo 1");
    expect(dueLaterItems[0].dueDate).toBe(tomorrowDate);
    expect(dueLaterItems[1].title).toBe("Due tomorrow todo 2");
    expect(dueLaterItems[1].dueDate).toBe(tomorrowDate);
  });

  test("Should format the todo list correctly", () => {
    // Create date for yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];

    // Create date for today
    const today = new Date().toISOString().split("T")[0];

    // Add an overdue incomplete todo
    todos.add({
      title: "Overdue todo",
      completed: false,
      dueDate: yesterdayDate,
    });

    // Add a completed todo for today
    todos.add({
      title: "Completed todo",
      completed: true,
      dueDate: today,
    });

    // Format overdue items
    const overdueItems = todos.overdue();
    const formattedOverdue = todos.toDisplayableList(overdueItems);
    expect(formattedOverdue).toBe(`[ ] Overdue todo ${yesterdayDate}`);

    // Format due today items
    const dueTodayItems = todos.dueToday();
    const formattedDueToday = todos.toDisplayableList(dueTodayItems);
    expect(formattedDueToday).toBe("[x] Completed todo");
  });
});
