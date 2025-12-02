import { TodoCreator } from "../logic/logic";
import { todoStorage } from "../logic/logic";



function getUserTask() {

    document.addEventListener("click", e => {
        if (e.target.matches(".todo-item")) {
            console.log(e.target.dataset.id)
        }
    })

    
}


getUserTask()