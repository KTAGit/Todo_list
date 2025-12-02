import { projectStorage } from "../logic/logic";


// Create and return a project <div> element with the appropriate class and text content.
export function createProjectElement(project) {
    const div = document.createElement("div")
    div.className = "project-item"
    div.textContent = project.name
    return div
}

// Render all projects from storage into the project container.
export function renderProjects() {
    const projectContainer = document.querySelector(".project-item-container")
    projectContainer.textContent = ""
    
    projectStorage.forEach( project => {
        const element = createProjectElement(project)
        projectContainer.appendChild(element)
    } )
}   


