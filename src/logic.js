
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
    constructor( title, description, duedate, priority, parentID ) {
        this.title = title
        this.description = description
        this.duedate = duedate
        this.priority = priority
        this.parentID = parentID
    }
}




const pro1 = new ProjectCreator("Personal")
const todo1 = new TodoCreator("Do homework", "Math homework needs to be completed", "8/5/2025", "High", pro1.id)


console.log(pro1)

console.log(todo1)