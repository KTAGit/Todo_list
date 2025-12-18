import { todoStorage } from "../logic/logic";

// Creates an input element for the task title and sets its value from the todo
function createTitleElement(todo) {
    const input = document.createElement("input")
    input.classList.add("task-title")
    input.value = todo.title
    return input
}

// Creates a textarea element for the task description, using a placeholder if empty
function createDescriptionElement(todo) {
    const textarea = document.createElement("textarea")
    textarea.classList.add("task-description")
    todo.description == undefined || todo.description == "" ? textarea.placeholder = "Description" : textarea.value = todo.description
    return textarea
}

// Renders the task details for the selected todo into the task section UI
export function renderTask(id) {
    todoStorage.forEach(todo => {
        if (todo.id === id) {
            const mainContainer = document.querySelector(".main-container")
            const taskSectionContainer = document.querySelector(".task-section-container")
            const titleContainer = document.querySelector(".task-title-container")
            const descriptionContainer = document.querySelector(".task-description-container")
            const taskSettings = document.querySelector(".task-settings")
            const buttonContainer = document.querySelector(".btn-container")
            const today = new Date().toISOString().split("T")[0];
            document.querySelector("#task-duedate").min = today
            
            mainContainer.classList.add("show-third")
            taskSectionContainer.classList.add("show-task")
            taskSectionContainer.dataset.id = id
            buttonContainer.style.display = "flex"
            taskSettings.style.display = "block"
            titleContainer.innerHTML = ""
            descriptionContainer.innerHTML = ""
            titleContainer.appendChild(createTitleElement(todo))
            descriptionContainer.appendChild(createDescriptionElement(todo))
            if (todo.priority !== undefined) {
                document.querySelector("#task-priority").value = todo.priority;
            }else {
                document.querySelector("#task-priority").value = "";
            }

            if (todo.duedate !== undefined) {
                document.querySelector("#task-duedate").value = todo.duedate;
            }else {
                document.querySelector("#task-duedate").value = "";
            }
            
            if (todo.status !== undefined) {
                document.querySelector("#task-status").value = todo.status;
            }else {
                document.querySelector("#task-status").value = "";
            }
        }
    })
}

// Hides the task section 
 export function hideTaskSection() {
    const mainContainer = document.querySelector(".main-container")
    const taskSectionContainer = document.querySelector(".task-section-container")

    mainContainer.classList.remove("show-third")
    taskSectionContainer.classList.remove("show-task")
}

// Toggle deletion confirmation popup visibility
export function confirmation(show, item = ""){
    const popup = document.querySelector(".confirmation-popup")
    const text = document.querySelector(".text-content")
    const overlay = document.querySelector(".overlay-off")
    if (show) {
        text.textContent = `Are you sure you want to delete\n${item} ?`
        overlay.classList.add("overlay")
        popup.classList.add("confirmation")
    }else {
        overlay.classList.remove("overlay")
        popup.classList.remove("confirmation")
    }
}

