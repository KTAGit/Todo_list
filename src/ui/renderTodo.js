import { todoStorage } from "../logic/logic";


// Create and return a todo <div> element with the appropriate class and text content.
export function createTodoElement(todo) {
    const div = document.createElement("div")
    div.className = "todo-item"
    div.textContent = todo.title
    div.dataset.id = todo.id
    return div
}

// Render all todo from storage into the todo container.
export function renderTodos() {
    const todoContainer = document.querySelector(".todo-item-container")
    todoContainer.innerHTML = ""
    
    todoStorage.forEach( todo => {
        const element = createTodoElement(todo)
        const todoAndBtnContainer = document.createElement("div")
        const todoCompleteButton = document.createElement("div")
        const arrowPoint = document.createElement("div")
        todoAndBtnContainer.classList.add("todo-and-btn-container")
        todoCompleteButton.classList.add("todo-complete-btn") 
        arrowPoint.classList.add("chevron-right") 
        arrowPoint.textContent = ""
        todoAndBtnContainer.appendChild(todoCompleteButton)
        todoAndBtnContainer.appendChild(element)
        todoAndBtnContainer.appendChild(arrowPoint)
        todoContainer.appendChild(todoAndBtnContainer)
    } )
}   

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

export function highlightTodo(id) {
    const todoItems = document.querySelectorAll(".todo-item")

    todoItems.forEach(todo => {
        
        const container = todo.parentElement
        if (id === todo.dataset.id) {
            
            console.log(`${id} AND ${todo.dataset.id}`)
            container.classList.add("selected")
        }else {
            container.classList.remove("selected")
        }
    })
}
