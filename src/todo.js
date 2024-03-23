export const todos = [];
export const projects = ["default"];

let maxTodoId = 1;

export function createTodo(todo) {
    const newTodo = {
        id: maxTodoId++,
        title: todo.title,
        dueDate: todo.dueDate,
        priority: todo.priority,
        isComplete: false,
        project: "default",
        notes: "",
    };
    todos.push(newTodo);
}

export function updateTodo(id, update) {
    const todoIndex = todos.findIndex((todo) => todo.id === +id);

    if (todoIndex !== -1) {
        todos[todoIndex].title = update.title;
        todos[todoIndex].notes = update.notes;
        todos[todoIndex].dueDate = update.dueDate;
        todos[todoIndex].priority = update.priority;
        todos[todoIndex].project = update.project;
        todos[todoIndex].notes = update.notes;
    }
}

export function createProject(name) {
    projects.push(name);
}
