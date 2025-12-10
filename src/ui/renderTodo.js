import { todoStorage } from "../logic/logic";


// Create and return a todo <div> element with the appropriate class and text content.
export function createTodoElement(todo) {
    const div = document.createElement("div")
    div.className = "todo-item"
    div.textContent = todo.title
    div.dataset.id = todo.id
    return div
}

// Renders all todos belonging to the given project ID
export function renderTodos(projectID) {
    const container = document.querySelector(".todo-item-container");
    container.innerHTML = "";

    todoStorage.forEach(todo => {
        if (todo.projectID === projectID) {
            const element = createTodoElement(todo);

            const wrapper = document.createElement("div");
            wrapper.classList.add("todo-and-btn-container");

            const completeBtn = document.createElement("div");
            completeBtn.classList.add("todo-complete-btn");

            const arrow = document.createElement("div");
            arrow.classList.add("chevron-right");

            wrapper.append(completeBtn, element, arrow);
            container.appendChild(wrapper);
        }
    });
} 

// Updates the displayed title for the todo with the specified ID
export function updateTodoTitle(id) {
    const todos = document.querySelectorAll(".todo-item")
    for (const element of todos) {
        if (element.dataset.id === id) {
            for (const todo of todoStorage) {   
                if (todo.id === id) {      
                    element.textContent = todo.title
                }
            }   
        }
    }
}

// Highlights the selected todo for visual feedback by adding a CSS class
export function highlightTodo(id) {
    const todoItems = document.querySelectorAll(".todo-item")

    todoItems.forEach(todo => {
        const container = todo.parentElement
        if (id === todo.dataset.id) {
            container.classList.add("selected")
        }else {
            container.classList.remove("selected")
        }
    })
}
