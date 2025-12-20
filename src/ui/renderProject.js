import { projectStorage } from "../logic/logic";


// Create and return a project <div> element with the appropriate class and text content.
export function createProjectElement(project) {
    const div = document.createElement("div")
    div.className = "project-item"
    div.textContent = project.name
    div.dataset.id = project.id
    return div
}

// Render all projects from storage into the project container.
export function renderProjects() {
    const projectContainer = document.querySelector(".project-item-container") 
    projectContainer.textContent = ""
    
    projectStorage.forEach( project => {
        const element = createProjectElement(project)
        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("project-delete-btn")
        deleteBtn.dataset.id = project.id 
        deleteBtn.textContent = "×"
        element.appendChild(deleteBtn)
        projectContainer.appendChild(element)
    } )
}   

// Highlights the selected Project for visual feedback and sets the project title
export function highlightProject(id) {
    const projectItem = document.querySelectorAll(".project-item")
    const projectTitle = document.querySelector(".main.todo-title")
    projectItem.forEach(project => {       
        if (id === project.dataset.id) {
            project.classList.add("selected")
            projectTitle.textContent = project.textContent.slice(0, -1)
        }else {
            project.classList.remove("selected")
        }
    })
}

renderProjects()