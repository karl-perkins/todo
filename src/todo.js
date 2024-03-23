export const projects = {
    default: [],
};

export function createTodo(title, description, dueDate, priority) {
    return { title, description, dueDate, priority, isComplete: false };
}

export function createProject(name) {
    projects[name] = [];
}
