import "./style.css";
import * as Todo from "./todo.js";

let selectedProject = 'default';

function renderTodos() {
    const todos = Todo.getTodosByProject(selectedProject);
    const todoList = document.querySelector("#todo-list");
    todoList.innerHTML = "";

    for (const todo of todos) {
        const todoListItem = document.createElement("div");
        todoListItem.id = `todo-${todo.id}`
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
    const todoElement = document.querySelector(`#todo-${id}`)
    const updateTodo = Todo.getTodo(id);

    const priorityOptions = ["Low", "Medium", "High"];

    const editForm = `<form id="edit-todo-form">
        <div class="form-control hidden">
            <label for="edit-id">Id</label>
            <input type="text" name="id" id="edit-id" value=${updateTodo.id} />
        </div>
        <div class="form-control">
            <label for="edit-title">Title</label>
            <input type="text" name="title" id="edit-title" value=${
                updateTodo.title
            } />
        </div>
        <div class="form-control">
            <label for="edit-project">Project</label>
            <select name="project" id="edit-project">
                ${Todo.projects.reduce(
                    (html, project) =>
                        (html +=
                            project === updateTodo.project
                                ? `<option value="${project}" selected>${project}</option>`
                                : `<option value="${project}">${project}</option>`),
                    ""
                )}
            </select>
        </div>
        <div class="form-control">
            <label for="edit-due-date">Due Date</label>
            <input type="date" name="dueDate" id="edit-due-date" value=${
                updateTodo.dueDate
            } />
        </div>
        <div class="form-control">
            <label for="edit-priority">Priority</label>
            <select name="priority" id="edit-priority">
                ${priorityOptions.reduce(
                    (html, priority) =>
                        (html +=
                            priority === updateTodo.priority
                                ? `<option value="${priority}" selected>${priority}</option>`
                                : `<option value="${priority}">${priority}</option>`),
                    ""
                )}
            </select>
        </div>
        <div class="form-control full-row">
            <label for="edit-notes">Notes</label>
            <textarea name="notes" id="edit-notes">${
                updateTodo.notes
            }</textarea>
        </div>
        <button type="button" class="cancel-btn">Cancel</button>
        <button type="submit">Save</button>
    </form>`;

    todoElement.innerHTML = editForm;

    document
        .querySelector("#edit-todo-form")
        .addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);

            const updateTodoId = formData.get("id");
            const updateTodo = {
                title: formData.get("title"),
                dueDate: formData.get("dueDate"),
                priority: formData.get("priority"),
                project: formData.get("project"),
                notes: formData.get("notes"),
            };

            Todo.updateTodo(updateTodoId, updateTodo);

            renderTodos();
        });

    document.querySelector('.cancel-btn').addEventListener('click', (e) => {
        renderTodos();
    });

}

function deleteTodo(id) {
    Todo.deleteTodo(id);
    renderTodos();
}

function renderProjects() {
    const projectList = document.querySelector("#project-list");

    projectList.innerHTML = "";

    for (const project of Todo.projects) {
        const projectListItem = document.createElement("div");
        projectListItem.classList.add("project-list-item");

        const viewButton = document.createElement("button");
        viewButton.textContent = project;
        viewButton.onclick = () => { 
            selectedProject = project;
            renderTodos(); 
        };
        projectListItem.appendChild(viewButton);

        projectList.appendChild(projectListItem);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    renderProjects();
});

document.querySelector("#new-project-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const project = formData.get("project");

    Todo.createProject(project);

    renderProjects();
    e.target.reset();
});

document.querySelector("#create-todo-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newTodo = {
        title: formData.get("title"),
        project: selectedProject,
    };

    Todo.createTodo(newTodo);

    e.target.reset();
    renderTodos();
});
