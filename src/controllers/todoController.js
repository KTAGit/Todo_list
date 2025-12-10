import { TodoCreator } from "../logic/logic";
import { storeTodo } from "../logic/logic";
import { renderTodos } from "../ui/renderTodo";  
import { activeProjectID } from "./projectController";

// Creates a new todo for a project and saves it to storage
export function addTodoToStorage(projectID, text) {
    const newTodo = new TodoCreator(text);
    newTodo.projectID = projectID;
    storeTodo(newTodo);
}

// When the Add button is clicked, create a todo for the active project and re-render
document.querySelector(".task.Add-symbol").addEventListener("click", () => {
    const input = document.querySelector(".todo-input");
    if (!input.value || !activeProjectID) return;

    addTodoToStorage(activeProjectID, input.value);
    input.value = "";
    renderTodos(activeProjectID);
});
