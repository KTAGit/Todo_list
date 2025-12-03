

export const projectStorage = []
export const todoStorage = [] 


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
