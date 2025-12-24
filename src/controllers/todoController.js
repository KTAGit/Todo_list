import { TodoCreator } from "../logic/logic";
import { storeTodo } from "../logic/logic";
import { renderTodos } from "../ui/renderTodo";  
import { activeProjectID } from "./projectController";
import { todoStorage } from "../logic/logic";
import { hideTaskSection } from "../ui/renderTask";
import { toggleCompleteIcon } from "../ui/renderTodo";
import { displayTodoSettings } from "../ui/renderTodo";
import { saveTodoInStorage } from "../logic/logic";
import { renderCompletedTodos } from "../ui/renderTodo";

// Creates a new todo for a project and saves it to storage
export function addTodoToStorage(projectID, text) {
    const newTodo = new TodoCreator(text);
    newTodo.projectID = projectID;
    storeTodo(newTodo);
}

// When the Add button is clicked, create a todo for the active project and re-render
document.querySelector(".task.Add-symbol").addEventListener("click", () => {
    const input = document.querySelector(".todo-input");
    const trimmedInput = input.value.trim()
    if (!input.value || !activeProjectID) return;
    if (trimmedInput.length === 0) return;
    
    addTodoToStorage(activeProjectID, trimmedInput);
    input.value = "";
    renderTodos(activeProjectID);
    saveTodoInStorage()
});

// When the Enter key pressed trigger click to the add button
document.querySelector(".todo-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.querySelector(".task.Add-symbol").click()
    }
})

// Delete all todos associated with the deleted project
export function removeTodosByProjectId(deletedProjectID) {
    for (let i = todoStorage.length - 1; i >= 0; i--) {
        const todo = todoStorage[i];
        if (todo.projectID === deletedProjectID) {
            todoStorage.splice(i, 1)
        }
    }
}

// Toggle completion status of a todo in storage and update its UI
function changeTodoStatus(id){
    todoStorage.forEach(todo => {
        if (todo.id === id) {
            if (todo.status !== "Completed") {
                todo.status = "Completed"
                displayTodoSettings(todo.priority, todo.duedate, todo.status, id)
            }else {
                todo.status = ""
                renderTodos(activeProjectID);
            }
            
        }
    })
}

// Handle clicks on todo completion button
document.addEventListener("click", (e) => {
    if (e.target.matches(".todo-complete-btn")) {
        toggleCompleteIcon(e.target.parentElement.dataset.id)
        changeTodoStatus(e.target.parentElement.dataset.id)
        renderTodos(activeProjectID);
        renderCompletedTodos(activeProjectID)
    }
})