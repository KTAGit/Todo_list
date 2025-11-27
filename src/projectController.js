import { ProjectCreator } from "./logic";
import { storeProject } from "./logic";
import { renderProjectELement } from "./renderPorject";
 
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
        renderProjectELement()
    })
}

getUserInput()