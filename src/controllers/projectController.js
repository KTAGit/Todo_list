import { ProjectCreator } from "../logic/logic";
import { storeProject } from "../logic/logic";
import { renderProjects } from "../ui/renderProject";
import { renderTodos } from "../ui/renderTodo";
import { getUserTodo } from "./todoController";
 
// Set up the input handler: on click, create a new project, store it, 
// and re-render the project list
function getUserInput() {
    const userInput = document.querySelector(".project-input")
    const addButton = document.querySelector(".project.Add-symbol")
    addButton.addEventListener("click", () => {
        if (userInput.value === "") { return }
        const userProject = new ProjectCreator(userInput.value)
        storeProject(userProject)
        userInput.value = ""
        renderProjects()
    })
}

// Tracks the currently selected project ID
export let activeProjectID = null

// When a project is clicked, set it as active and render its todos
document.addEventListener("click", e => {
    if (e.target.matches(".project-item")) {
        activeProjectID = e.target.dataset.id;
        renderTodos(activeProjectID);
    }
});


getUserInput()