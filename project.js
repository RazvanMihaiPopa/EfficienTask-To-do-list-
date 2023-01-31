const todoInput = document.querySelector(".todo-input");
const addNewTask = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const selectAllTasks = document.querySelector(".selected");
const deleteAllTasks = document.querySelector(".deleted");


deleteAllTasks.addEventListener("click", deleteAllSelected);
selectAllTasks.addEventListener("click", selectAll);
document.addEventListener("DOMContentLoaded", getLocalTodos);
addNewTask.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();
    if(todoInput.value == "") {
        alert("Write something!");
        return;
    }
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    
    // adauga in local storage
    saveLocalTodos(todoInput.value);
    
    // creeaza butonul de complete
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-calendar-check"></i></i></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // creeaza butonul de delete
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("delete-btn");
    todoDiv.appendChild(trashButton);
    
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }

    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function selectAll() {
    children = todoList.childNodes;
    for(var i = 0; i < children.length; i++) {
        children[i].classList.add("completed");
    }
}
function deleteAllSelected() {
    while(todoList.hasChildNodes) {
        removeLocalTodos(todoList.firstChild);
        todoList.removeChild(todoList.firstChild);
    }
    
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if (e.target.value === "all") {
            todo.style.display = "flex";
        } else if (e.target.value === "completed") {
            if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        } else if (e.target.value === "incomplete") {
            if (!todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        }
    });
}

function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fa-solid fa-calendar-check"></i></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("delete-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}