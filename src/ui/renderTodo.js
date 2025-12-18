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
            wrapper.dataset.id = todo.id

            const completeBtn = document.createElement("div");
            completeBtn.classList.add("todo-complete-btn");
            if (todo.status === "Completed") {
                completeBtn.textContent = "✓"
            }

            const arrow = document.createElement("div");
            arrow.classList.add("chevron-right");

            wrapper.append(completeBtn, element, arrow);
            container.appendChild(wrapper);
            displayTodoSettings(todo.priority, todo.duedate, todo.status, todo.id)
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

// Remove todo DOM element matching deletedTodoID
export function removeDeletedTodo(deletedTodoID) {
    const todoItems = document.querySelectorAll(".todo-item")
    todoItems.forEach(todo => {
        if (todo.dataset.id === deletedTodoID) {
            todo.parentElement.remove()
        }
    })
}

// Display or toggle the settings section for the selected todo
export function displayTodoSettings(priority, duedate, status, taskID) {
    if (duedate) {
        const [year, month, day] = duedate.split("-")
        const date = new Date(year, month - 1, day)
        const formatted = date.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "numeric"
        })
        duedate = formatted.replace(/\//g, "-")
    }
    
    const settingsData = ["📅 " + duedate, status, priority]
    const todoContainers = document.querySelectorAll(".todo-and-btn-container")
    const todoSettingsContainer = document.createElement("div")
    todoSettingsContainer.classList.add("todo-settings-container")


    settingsData.forEach(data => {
        const element = document.createElement("div")
        element.classList.add("setting")
        if (data === "" || data === "📅 " || data === "📅 " + undefined) return
        if (data === "High") {element.textContent = "🟥 " + data}
        else if (data === "Medium") {element.textContent = "🟨 " + data}
        else if (data === "Low") {element.textContent = "⬜ " + data}
        else if (data === "Not Started") { element.textContent = " ➖ " + data}
        else if (data === "In Progress") { element.textContent = " ⏳ " + data }
        else if (data === "Completed") { element.textContent = " ✓ " + data }
        else element.textContent = data
        todoSettingsContainer.appendChild(element)
    })

    todoContainers.forEach(el => {
        const todoID = el.querySelector(".todo-item").dataset.id
        if (todoID === taskID) {
            const existingSettingsContainer = el.querySelector(".todo-settings-container")
            if (existingSettingsContainer === null) {
                if (todoSettingsContainer.textContent === "") return
                el.appendChild(todoSettingsContainer)
            }else {
                if (todoSettingsContainer.textContent === "") return
                el.querySelector(".todo-settings-container").remove()
                el.appendChild(todoSettingsContainer)
            }
        }
    })
}


// Clear the todo list and reset the main project title
export function clearTodoContainer() {
    const todoContainer = document.querySelector(".todo-item-container")
    const h1 = document.querySelector(".main.todo-title")
    h1.textContent = ""
    todoContainer.innerHTML = ""
}

// Toggle completed UI state (checkmark and completed class) for a todo
export function toggleCompleteIcon(id) {
    const todoContainer = document.querySelector(`.todo-and-btn-container[data-id="${id}"]`)
    if (!todoContainer) return

    const completeIconContainer = todoContainer.querySelector(".todo-complete-btn")

    const isCompleted = todoContainer.classList.toggle("completed");

    completeIconContainer.textContent = isCompleted ? "✓" : "";
    
}

