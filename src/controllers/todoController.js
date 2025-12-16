import { TodoCreator } from "../logic/logic";
import { storeTodo } from "../logic/logic";
import { renderTodos } from "../ui/renderTodo";  
import { activeProjectID } from "./projectController";
import { todoStorage } from "../logic/logic";

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