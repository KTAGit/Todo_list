import { todoStorage } from "../logic/logic";
import { activeProjectID } from "../controllers/projectController";

// Create and return a todo <div> element with the appropriate class and text content.
export function createTodoElement(todo) {
    const div = document.createElement("div")
    div.className = "todo-item"
    div.textContent = todo.title
    div.dataset.id = todo.id
    return div
}

function createTodoContents(todo) {

    const element = createTodoElement(todo);

    const wrapper = document.createElement("div");
    wrapper.classList.add("todo-and-btn-container");
    wrapper.dataset.id = todo.id

    const completeBtn = document.createElement("div");
    completeBtn.classList.add("todo-complete-btn");

    const arrow = document.createElement("div");
    arrow.classList.add("chevron-right");

    wrapper.append(completeBtn, element, arrow);
    return wrapper
    
}

// Renders all todos belonging to the given project ID
export function renderTodos(projectID) {
    const container = document.querySelector(".todo-item-container");
    container.innerHTML = "";
    // console.log(projectID)
    todoStorage.forEach(todo => {
        if (todo.projectID === projectID || todo.projectID === activeProjectID) {
            
            if (todo.status !== "Completed") {
                
                container.appendChild(createTodoContents(todo));
                
                displayTodoSettings(todo.priority, todo.duedate, todo.status, todo.id)
            }
                
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
        const [y, m, d] = duedate.split("-");
        duedate = new Date(y, m - 1, d)
            .toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "numeric"
            })
            .replace(/\//g, "-");
    }

    const settingsData = ["📅 " + duedate, status, priority];
    const todoContainers = document.querySelectorAll(".todo-and-btn-container");

    todoContainers.forEach(el => {
        const todoID = el.querySelector(".todo-item").dataset.id;
        if (todoID !== taskID) return;

        let settings = el.querySelector(".todo-settings-container");
        if (!settings) {
            settings = document.createElement("div");
            settings.classList.add("todo-settings-container");
            el.appendChild(settings);
        }

        settings.innerHTML = "";

        settingsData.forEach(data => {
            if (!data || data === "📅 " || data === "📅 " + undefined) return;

            const item = document.createElement("div");
            item.classList.add("setting");

            if (data === "High") item.textContent = "🟥 High";
            else if (data === "Medium") item.textContent = "🟨 Medium";
            else if (data === "Low") item.textContent = "⬜ Low";
            else if (data === "Not Started") item.textContent = "➖ Not Started";
            else if (data === "In Progress") item.textContent = "⏳ In Progress";
            else if (data === "Completed") item.textContent = "✓ Completed";
            else item.textContent = data;

            settings.appendChild(item);
        });
    });
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

    if (todoContainer.querySelector(".todo-complete-btn").textContent === "") {
        todoContainer.querySelector(".todo-complete-btn").textContent = "✓"
    }else {
        todoContainer.querySelector(".todo-complete-btn").textContent = ""
    }
}

// Renders all todos with "Completed" status for the given project ID
// and updates their UI state (checkmark and settings)
export function renderCompletedTodos(projectID) {
    const p = document.querySelector(".completed-todo-heading")
    const completedTodoContainer = document.querySelector(".completed-todo-item-container")
    completedTodoContainer.innerHTML = ""
    completedTodoContainer.appendChild(p)
    todoStorage.forEach(todo => {
        if (todo.projectID === projectID) {
            
            if (todo.status === "Completed") {
                const todoEl = createTodoContents(todo)
                completedTodoContainer.appendChild(todoEl);
                const todoContainer = document.querySelector(`.todo-and-btn-container[data-id="${todo.id}"]`)
                todoContainer.querySelector(".todo-complete-btn").textContent = "✓"
                displayTodoSettings(todo.priority, todo.duedate, todo.status, todo.id)
            }
        }
    })
}

