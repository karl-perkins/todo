import "./style.css";
import * as Todo from "./todo.js";

const createTodoForm = document.querySelector("#create-todo-form");

createTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(createTodoForm);

    const todoIndex = formData.get("id");
    const newTodo = {
        title: formData.get("title"),
        description: formData.get("description"),
        dueDate: formData.get("dueDate"),
        priority: formData.get("priority"),
        project: formData.get("project"),
    };

    if (todoIndex === "") {
        Todo.createTodo(newTodo);
    } else {
        Todo.updateTodo(todoIndex, newTodo);
    }

    createTodoForm.reset();

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

        todoList.appendChild(todoListItem);
    }
}

function editTodo(id) {
    const update = Todo.todos.find((todo) => todo.id === id);

    document.querySelector("#id").value = update.id;
    document.querySelector("#title").value = update.title;
    document.querySelector("#description").value = update.description;
    document.querySelector("#due-date").value = update.dueDate;
    document.querySelector("#priority").value = update.priority;
    document.querySelector("#project").value = update.project;
}

document.addEventListener("DOMContentLoaded", function () {
    const projectOptions = document.querySelector("#project");

    for (const project of Todo.projects) {
        const projectOption = document.createElement("option");
        projectOption.value = project;
        projectOption.textContent = project;

        projectOptions.appendChild(projectOption);
    }
});
