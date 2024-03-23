export const projects = {
    default: { maxTodoId: 1, todos: [] },
};

export function createTodo(id, title, description, dueDate, priority) {
    return { id, title, description, dueDate, priority, isComplete: false };
}

export function createProject(name) {
    projects[name] = [];
}
