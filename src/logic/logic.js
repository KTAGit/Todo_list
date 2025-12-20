export const projectStorage = loadProjectFromStorage()
export const todoStorage = loadTodoFromStorage()


// Create a project with a unique ID.
 export class ProjectCreator {
    constructor( name ){
        this.name = name
        this.id = crypto.randomUUID()
    }
}


// Represents a todo item assigned to a specific project.
export class TodoCreator {
    constructor( title, description, duedate, priority, status, projectID ) {
        this.title = title
        this.description = description
        this.duedate = duedate
        this.priority = priority
        this.status = status
        this.projectID = projectID
        this.id = crypto.randomUUID()
    }
}


// Adds a new project object to the projectStorage array.
export function storeProject(project) {
    projectStorage.push(project)
}


// Adds a new todo item to the todoStorage array.
export function storeTodo(todo) {
    todoStorage.push(todo)
}

// Loads all project from localStorage.
function loadProjectFromStorage() {
    return JSON.parse(localStorage.getItem("project-data")) || []
}

// Loads all todos from localStorage.
function loadTodoFromStorage() {
    return JSON.parse(localStorage.getItem("todo-data")) || []
}

// Persists the entire project storage array to localStorage.
export function saveProjectInStorage() {
    localStorage.setItem("project-data", JSON.stringify(projectStorage))
}

// Persists the entire todo storage array to localStorage.
export function saveTodoInStorage() {
    localStorage.setItem("todo-data", JSON.stringify(todoStorage))
}

