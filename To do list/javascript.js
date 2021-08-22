//select elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST = [],
 id = 0;

 //get item from local storage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set id to the last one on the list
    loadList(LIST);//load the list to UI
}else{
    //if data isnt empty
    LIST = [];
    id = 0;
}

//load items to UI
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//show todays date 
const options = {weekday : "long", month : "short", day : "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
function addToDo(ToDo, id, done, trash){

    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH: "";

    const item = `
    <li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${ToDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//add item to the list user the enter key

document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const ToDo = input.value;

        //if input is not empty 

        if(ToDo){
            addToDo(ToDo, id, false, false);
            input.value = "";
            list.push({
                name : ToDo,
                id : id,
                done : false,
                trash : false
            });
            //add item to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
    }
});

//complete to do 

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do 
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;

}

//target items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return clicked element inside list 
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete"){
        completeToDo(element);
    } else if (elementJob == "delete"){
        removeToDo(element);
    }
    //add item to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});