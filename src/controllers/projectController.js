import { ProjectCreator, projectStorage } from "../logic/logic";
import { storeProject } from "../logic/logic";
import { renderProjects } from "../ui/renderProject";
import { renderTodos } from "../ui/renderTodo";
import { highlightProject } from "../ui/renderProject";
import { hideTaskSection } from "../ui/renderTask";
import { confirmation } from "../ui/renderTask";
import { removeTodosByProjectId } from "./todoController";


// Set up the input handler: on click, create a new project, store it, 
// and re-render the project list
function getUserInput() {
    const userInput = document.querySelector(".project-input")
    const addButton = document.querySelector(".project.Add-symbol")
    addButton.addEventListener("click", () => {
        if (userInput.value === "" || userInput.value.trim().length === 0) { return }
        const userProject = new ProjectCreator(userInput.value)
        storeProject(userProject)
        userInput.value = ""
        renderProjects()
    })

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addButton.click()
        }
    })
}

// Tracks the currently selected project ID
export let activeProjectID = null
let deleteProjectTitle = null
let deleteProjectID = null

// When a project is clicked, set it as active and render its todos
document.addEventListener("click", e => {
    if (e.target.matches(".project-item")) {
        activeProjectID = e.target.dataset.id;
        highlightProject(activeProjectID)
        hideTaskSection()
        renderTodos(activeProjectID);
    }
});

// Handle project delete button clicks and open confirmation dialog
document.addEventListener("click", e => {
    if (e.target.matches(".project-delete-btn")) {
        deleteProjectTitle = e.target.parentElement.textContent.slice(0, -1)
        deleteProjectID = e.target.dataset.id
        confirmation(true, deleteProjectTitle)
    }
});

// Remove the currently selected project from storage
function deleteProject() {
    const index = projectStorage.findIndex(p => p.id === deleteProjectID)
        if (index !== -1) {
            projectStorage.splice(index, 1)
        }
        hideTaskSection()
}

// Delete the project and all todos associated with it
document.querySelector(".yes.btn").addEventListener("click", () => {
    deleteProject()
    removeTodosByProjectId(deleteProjectID)
    activeProjectID = null
    renderProjects()
    confirmation(false)
})

// Close confirmation dialog without deleting
document.querySelector(".no.btn").addEventListener("click", () => {
    confirmation(false)
})


getUserInput()