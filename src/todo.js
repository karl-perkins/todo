let todos = [];
let projects = ["default"];

let maxTodoId = 1;

export function initaliseLocalStorage() {
    if (!localStorage.getItem('projects')) {
        localStorage.setItem("projects", JSON.stringify(projects));
    } else {
        projects = JSON.parse(localStorage.getItem('projects'));
    }

    if (!localStorage.getItem('todos')) {
        localStorage.setItem("todos", JSON.stringify(todos));
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
}

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
    localStorage.setItem("todos", JSON.stringify(todos));
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

    localStorage.setItem("todos", JSON.stringify(todos));
    return todos[todoIndex];
}

export function deleteTodo(id) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
        const newTodos = todos.toSpliced(todoIndex, 1);
        todos = newTodos;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
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
    localStorage.setItem("projects", JSON.stringify(projects));
}

export function getProjects() {
    return projects;
}