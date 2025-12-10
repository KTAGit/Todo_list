import { TodoCreator } from "../logic/logic";
import { todoStorage } from "../logic/logic";
import { renderTask } from "../ui/renderTask";
import { updateTodoTitle } from "../ui/renderTodo";
import { highlightTodo } from "../ui/renderTodo"; 


export function getUserTask() {

    document.addEventListener("click", e => {
        if (e.target.matches(".todo-item")) {
            highlightTodo(e.target.dataset.id)
            renderTask(e.target.dataset.id)
        }
    })

    
}

export function updateUserSettings() {
    const saveChangesbtn = document.querySelector(".save-changes-btn")
    saveChangesbtn.addEventListener("click", () => {
        const currentTodoId = document.querySelector(".task-section-container").dataset.id
        const taskTitle = document.querySelector(".task-title").value
        const taskDescription = document.querySelector(".task-description").value
        const priorityValue = document.querySelector("#task-priority").value
        const dueDateValue = document.querySelector("#task-duedate").value
        const statusValue = document.querySelector("#task-status").value
        todoStorage.forEach(todo => {
            if (todo.id === currentTodoId) {
                if (todo.title !== taskTitle) {
                    todo.title = taskTitle
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