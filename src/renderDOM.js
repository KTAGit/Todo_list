import { projectStorage } from "./logic";
import { todoStorage } from "./logic";
import { ProjectCreator } from "./logic";



function createProjectElement(project) {
    const div = document.createElement("div")
    div.className = "project-item"
    div.textContent = project.name
    return div
}

function renderProjectELement() {
    const projectContainer = document.querySelector(".project-container")
    
    projectStorage.forEach( project => {
        const element = createProjectElement(project)
        projectContainer.appendChild(element)
    } )
}   


renderProjectELement()