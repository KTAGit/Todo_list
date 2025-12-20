import { todoStorage } from "../logic/logic";
import { renderTask } from "../ui/renderTask";
import { updateTodoTitle } from "../ui/renderTodo";
import { highlightTodo } from "../ui/renderTodo"; 
import { addTodoToStorage } from "./todoController";
import { hideTaskSection } from "../ui/renderTask";
import { confirmation } from "../ui/renderTask";
import { activeProjectID } from "./projectController";
import { renderTodos } from "../ui/renderTodo";
import { displayTodoSettings } from "../ui/renderTodo";
import { removeDeletedTodo } from "../ui/renderTodo";
import { toggleCompleteIcon } from "../ui/renderTodo";
import { projectStorage } from "../logic/logic";
import { saveTodoInStorage } from "../logic/logic";

// Tracks the currently selected Task ID and Title
let activeTaskID = null
let activeTaskTitle = null
let isTaskToDelete = null

// Handles clicks on todo items: highlights the selected todo and renders its details
export function getUserTask() {
    document.addEventListener("click", e => {
        const todoEl = e.target.closest(".todo-and-btn-container")
        if (!todoEl) return
        highlightTodo(todoEl.dataset.id)
        renderTask(todoEl.dataset.id)
        activeTaskID = todoEl.dataset.id
        activeTaskTitle = todoEl.textContent 
    })
}

// Handles saving task changes: validates input, updates the selected todo, and refreshes the UI
export function updateUserSettings() {
    const saveChangesbtn = document.querySelector(".save-changes-btn")
    const currentTodoId = document.querySelector(".task-section-container").dataset.id
    const taskTitle = document.querySelector(".task-title").value
    const taskDescription = document.querySelector(".task-description").value
    const priorityValue = document.querySelector("#task-priority").value
    const dueDateValue = document.querySelector("#task-duedate").value
    const statusValue = document.querySelector("#task-status").value
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle.length === 0) {
        document.querySelector(".task-title").placeholder = "Title required!"
        return
    }
    todoStorage.forEach(todo => {
        if (todo.id === currentTodoId) {
            if (todo.title !== trimmedTitle) {
                todo.title = trimmedTitle
                updateTodoTitle(currentTodoId)
            }
            todo.description = taskDescription
            todo.priority = priorityValue
            todo.duedate = dueDateValue
            todo.status = statusValue
        }
    })
    displayTodoSettings(priorityValue, dueDateValue, statusValue, activeTaskID)
    if( statusValue === "Completed" ){
        if (document.querySelector(".todo-complete-btn").textContent !== "✓") {
            toggleCompleteIcon(activeTaskID) 
        }
    }else if (statusValue !== "Completed") {
        if (document.querySelector(".todo-complete-btn").textContent === "✓") {
            toggleCompleteIcon(activeTaskID) 
        }
    } 
    saveChangesbtn.textContent = "Saving..."
    setTimeout(() => {
        saveChangesbtn.textContent = "Saved ✅"
        setTimeout(() => {
            saveChangesbtn.textContent = "Save changes"
        }, 3000)
    }, 1000)

}

// Save todo settings upon save button click
document.addEventListener("click", (e) => {   
    if (e.target.matches(".save-changes-btn")) {
        updateUserSettings()
        saveTodoInStorage()
    } 
})

// Remove the currently active task from storage
function deleteTask() {
    const index = todoStorage.findIndex(t => t.id === activeTaskID)
        if (index !== -1) {
            todoStorage.splice(index, 1)
        }
}

// Handle task delete button clicks and open confirmation dialog
document.querySelector(".delete-btn").addEventListener("click", () => {
    confirmation(true, activeTaskTitle)
    isTaskToDelete = true
})


// Delete the task and render all todos
document.querySelector(".yes.btn").addEventListener("click", () => {
    if (!isTaskToDelete) return
    deleteTask()
    hideTaskSection()
    removeDeletedTodo(activeTaskID)
    saveTodoInStorage()
    confirmation(false)
    isTaskToDelete = false
})

// Close confirmation dialog without deleting
document.querySelector(".no.btn").addEventListener("click", () => {
    confirmation(false)
})

getUserTask()