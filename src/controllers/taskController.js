import { TodoCreator } from "../logic/logic";
import { todoStorage } from "../logic/logic";
import { renderTask } from "../ui/renderTask";


export function getUserTask() {

    document.addEventListener("click", e => {
        if (e.target.matches(".todo-item")) {
           renderTask(e.target.dataset.id)
        }
    })

    
}


getUserTask()