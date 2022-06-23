const form = document.querySelector(".js-to-do"),
  input = document.querySelector(".js-add-to-do"),
  todoDiv = document.querySelector(".to-do-div");;
 let list = document.querySelector(".js-list");
let cnt = 0;
let toDos = [];

function persistToDos() {
  const stringToDo = JSON.stringify(toDos);
  localStorage.setItem("toDos", stringToDo);
}

function saveToDo(text) {
  const toDoObject = {
    id: toDos.length + 1,
    value: text
  };
  toDos.push(toDoObject);
  persistToDos();
}

function handleDelete(event) {
  const target = event.target;
  const li = target.parentElement;
  const ul = li.parentElement;
  const toDoId = li.id;
  ul.removeChild(li);
  toDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(toDoId);
  });
  persistToDos();
}

function addToDo(text) {

  if(toDos.length >= cnt*10){
   let list2 = document.createElement("ul");
   list2.className = "js-list list";
   list = list2;
   todoDiv.append(list);
   cnt++;
  }
  const toDo = document.createElement("li");
  toDo.className = "toDo";
  toDo.id = toDos.length + 1;
  
  const deleteBtn = document.createElement("span");
  // deleteBtn.innerHTML = "🗹";
  deleteBtn.innerHTML = "🗸";
  deleteBtn.className = "toDo__button";
  deleteBtn.addEventListener("click", handleDelete);
  const label = document.createElement("label");
  label.innerHTML = text;
  toDo.appendChild(deleteBtn);
  toDo.appendChild(label);
  list.appendChild(toDo);

  saveToDo(text);
}

function onSubmit(event) {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addToDo(value);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      addToDo(toDo.value);
    });
  }
  return;
}

function init() {
  loadToDos();
}

form.addEventListener("submit", onSubmit);

init();
