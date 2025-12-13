import { ProjectCreator, projectStorage } from "../logic/logic";
import { storeProject } from "../logic/logic";
import { renderProjects } from "../ui/renderProject";
import { renderTodos } from "../ui/renderTodo";
import { highlightProject } from "../ui/renderProject";
import { hideTaskSection } from "../ui/renderTask";
import { confirmation } from "../ui/renderTask";

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


document.addEventListener("click", e => {
    if (e.target.matches(".project-delete-btn")) {
        deleteProjectTitle = e.target.parentElement.textContent.slice(0, -1)
        deleteProjectID = e.target.dataset.id
        confirmation(true, deleteProjectTitle)
    }
});

function deleteProject() {
    const index = projectStorage.findIndex(p => p.id === deleteProjectID)
        if (index !== -1) {
            projectStorage.splice(index, 1)
        }
        hideTaskSection()
}
        
document.querySelector(".yes.btn").addEventListener("click", () => {
    deleteProject()
    renderProjects()
    confirmation(false)
})

document.querySelector(".no.btn").addEventListener("click", () => {
    confirmation(false)
})


getUserInput()