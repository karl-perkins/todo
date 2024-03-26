import "./style.css";
import * as Todo from "./todo.js";

const createTodoForm = document.querySelector("#create-todo-form");

createTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(createTodoForm);

    const newTodo = {
        title: formData.get("title"),
        dueDate: formData.get("dueDate"),
        priority: formData.get("priority"),
    };

    Todo.createTodo(newTodo);
    createTodoForm.reset();
    renderTodos(Todo.todos);
});

const editTodoForm = document.querySelector("#edit-todo-form");
editTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(editTodoForm);

    const updateTodoId = formData.get("id");
    const updateTodo = {
        title: formData.get("title"),
        dueDate: formData.get("dueDate"),
        priority: formData.get("priority"),
        project: formData.get("project"),
        notes: formData.get("notes"),
    };

    Todo.updateTodo(updateTodoId, updateTodo);

    renderTodos(Todo.todos);
});

function renderTodos(todos) {
    const todoList = document.querySelector("#todo-list");
    todoList.innerHTML = "";

    for (const todo of todos) {
        const todoListItem = document.createElement("div");
        todoListItem.classList.add("todo-list-item");

        const isComplete = document.createElement("input");
        isComplete.type = "checkbox";
        todoListItem.appendChild(isComplete);

        const title = document.createElement("div");
        title.textContent = todo.title;
        todoListItem.appendChild(title);

        const dueDate = document.createElement("div");
        dueDate.textContent = todo.dueDate;
        todoListItem.appendChild(dueDate);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = editTodo.bind(this, todo.id);
        todoListItem.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = deleteTodo.bind(this, todo.id);
        todoListItem.appendChild(deleteButton);

        todoList.appendChild(todoListItem);
    }
}

function editTodo(id) {
    const update = Todo.todos.find((todo) => todo.id === id);
    document.querySelector("#edit-id").value = update.id;
    document.querySelector("#edit-title").value = update.title;
    document.querySelector("#edit-due-date").value = update.dueDate;
    document.querySelector("#edit-priority").value = update.priority;
    document.querySelector("#edit-project").value = update.project;
    document.querySelector("#edit-notes").value = update.notes;
}

function deleteTodo(id) {
    Todo.deleteTodo(id);
    renderTodos(Todo.todos);
}

document.addEventListener("DOMContentLoaded", function () {
    const projectOptions = document.querySelector("#edit-project");

    for (const project of Todo.projects) {
        const projectOption = document.createElement("option");
        projectOption.value = project;
        projectOption.textContent = project;

        projectOptions.appendChild(projectOption);
    }
});
