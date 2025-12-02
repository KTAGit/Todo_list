import { TodoCreator } from "../logic/logic";
import { storeTodo } from "../logic/logic";
import { renderTodos } from "../ui/renderTodo";  

// Set up the input handler: on click, create a new todo, store it, 
// and re-render the todo list
function getUserTodo() {
    const userInput = document.querySelector(".todo-input")
    const addButton = document.querySelector(".task.Add-symbol")
    addButton.addEventListener("click", () => {
        if (userInput.value === "") { return }
        const userTodo = new TodoCreator(userInput.value)
        storeTodo(userTodo)
        userInput.value = ""
        renderTodos()
    })
}

getUserTodo()