import "./style.css";
import * as Todo from "./todo.js";

const createTodoForm = document.querySelector("#create-todo-form");

createTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(createTodoForm);
    createTodo(formData);
    
    createTodoForm.reset();

    renderTodos(Todo.todos);
});

function renderTodos(todos) {
    const todoList = document.querySelector("#todo-list");

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
        todoListItem.appendChild(editButton);

        todoList.appendChild(todoListItem);
    }
}

function createTodo(formData) {
    const newTodo = Todo.createTodo(
        formData.get("title"),
        formData.get("description"),
        formData.get("dueDate"),
        formData.get("priority"),
        formData.get("project")
    );

    Todo.todos.push(newTodo);
}

document.addEventListener("DOMContentLoaded", function() {
    const projectOptions = document.querySelector('#project');

    for (const project of Todo.projects) {
        const projectOption = document.createElement('option');
        projectOption.value = project;
        projectOption.textContent = project;
        
        projectOptions.appendChild(projectOption);
    }
});