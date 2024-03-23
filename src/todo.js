export const todos = [];
export const projects = ["default"];

let maxTodoId = 1;

export function createTodo(title, description, dueDate, priority, project) {
    return { id: maxTodoId++, title, description, dueDate, priority, isComplete: false, project };
}

export function createProject(name) {
    projects.push(name);
}
