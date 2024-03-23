import "./style.css";
import * as Todo from "./todo.js";

const createTodoForm = document.querySelector("#create-todo-form");

createTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(createTodoForm);

    const project = 'default';

    const todoId = Todo.projects[project].maxTodoId++;
    const newTodo = Todo.createTodo(
        todoId,
        formData.get("title"),
        formData.get("description"),
        formData.get("dueDate"),
        formData.get("priority")
    );
    
    Todo.projects[project].todos.push(newTodo);
    console.log(Todo.projects[project].todos);

    createTodoForm.reset();

    const todoList = document.querySelector('#todo-list');

    const todoListItem = document.createElement('div');
    todoListItem.classList.add('todo-list-item');

    const isComplete = document.createElement('input');
    isComplete.type = 'checkbox';

    const title = document.createElement('div');
    title.textContent = formData.get('title');

    const dueDate = document.createElement('div');
    dueDate.textContent = formData.get('dueDate');

    todoListItem.appendChild(isComplete);
    todoListItem.appendChild(title);
    todoListItem.appendChild(dueDate);
    todoList.appendChild(todoListItem);
});

