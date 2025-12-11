import { todoStorage } from "../logic/logic";
import { renderTask } from "../ui/renderTask";
import { updateTodoTitle } from "../ui/renderTodo";
import { highlightTodo } from "../ui/renderTodo"; 

// Handles clicks on todo items: highlights the selected todo and renders its details
export function getUserTask() {

    document.addEventListener("click", e => {
        if (e.target.matches(".todo-item")) {
            highlightTodo(e.target.dataset.id)
            renderTask(e.target.dataset.id)
        }
    })
}

// Handles saving task changes: validates input, updates the selected todo, and refreshes the UI
export function updateUserSettings() {
    const saveChangesbtn = document.querySelector(".save-changes-btn")
    saveChangesbtn.addEventListener("click", () => {
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
        saveChangesbtn.textContent = "Saving..."
        setTimeout(() => {
            saveChangesbtn.textContent = "Saved ✅"
            setTimeout(() => {
                saveChangesbtn.textContent = "Save changes"
            }, 3000)
        }, 1000)  
        
    })
    
}
updateUserSettings()

getUserTask()