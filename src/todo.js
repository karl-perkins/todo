export const todos = [];
export const projects = ["default"];

let maxTodoId = 1;

export function createTodo(todo) {
    const newTodo = {
        id: maxTodoId++,
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority,
        isComplete: false,
        project: todo.project,
    };
    todos.push(newTodo);
}

export function updateTodo(id, update) {
    const todoIndex = todos.findIndex((todo) => todo.id === +id);

    if (todoIndex !== -1) {
        todos[todoIndex].title = update.title;
        todos[todoIndex].description = update.description;
        todos[todoIndex].dueDate = update.dueDate;
        todos[todoIndex].priority = update.priority;
    }
}

export function createProject(name) {
    projects.push(name);
}
