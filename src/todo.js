let todos = [];
export const projects = ["default", "flax"];

let maxTodoId = 1;

export function createTodo(todo) {
    const newTodo = {
        id: maxTodoId++,
        title: todo.title,
        dueDate: todo.dueDate,
        priority: todo.priority,
        isComplete: false,
        project: todo.project ?? "default",
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

    return todos[todoIndex];
}

export function deleteTodo(id) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
        const newTodos = todos.toSpliced(todoIndex, 1);
        todos = newTodos;
    }
}

export function getTodos() {
    return todos;
}

export function getTodosByProject(project) {
    const filteredTodos = todos.filter((todo) => todo.project === project);
    return filteredTodos;
}

export function getTodo(id) {
    const todo = todos.find((todo) => todo.id === id);
    return todo;
}

export function createProject(name) {
    if (projects.includes(name) === false) {
        projects.push(name);
    }
}
