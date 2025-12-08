import { todoStorage } from "../logic/logic";


function createTitleElement(todo) {
    const input = document.createElement("input")
    input.classList.add("task-title")
    input.value = todo.title
    return input
}

function createDescriptionElement(todo) {
    const textarea = document.createElement("textarea")
    textarea.classList.add("task-description")
    todo.description == undefined ? textarea.placeholder = "Description" : textarea.value = todo.description
    return textarea
}

function createDuedateElement(todo) {
    const div = document.createElement("div")
    div.classList.add("task-duedate")
    div.textContent = todo.duedate
    return div
}

function createPriorityElement(todo) {
    const div = document.createElement("div")
    div.classList.add("task-priority")
    div.textContent = todo.priority
    return div
}

function createStatusElement(todo) {
    const div = document.createElement("div")
    div.classList.add("task-status")
    div.textContent = todo.status
    return div
}

export function renderTask(id) {
    todoStorage.forEach(todo => {
        if (todo.id === id) {
            const titleContainer = document.querySelector(".task-title-container")
            const descriptionContainer = document.querySelector(".task-description-container")
            const taskSettings = document.querySelector(".task-settings")
            const buttonContainer = document.querySelector(".btn-container")
            buttonContainer.style.display = "flex"
            taskSettings.style.display = "block"
            titleContainer.innerHTML = ""
            descriptionContainer.innerHTML = ""
            titleContainer.appendChild(createTitleElement(todo))
            descriptionContainer.appendChild(createDescriptionElement(todo))  
        }
    })
}



