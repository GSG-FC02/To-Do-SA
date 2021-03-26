
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// EventListener 
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click',newElement);
todoList.addEventListener('click',deletecheck);
filterOption.addEventListener('click',filterToDo);

function newElement(event){
  event.preventDefault();

  //create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
     
  //create li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // Add ToDo To LocaL Storage
  saveLocalTodos(todoInput.value);

  // create checked button
  const completedButton = document.createElement('button');
  completedButton.innerHTML='<i class="far fa-check" ></i>'; 
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //create delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  //appened to the list 
  todoList.appendChild(todoDiv);
  
  // Clear todo input value
  todoInput.value = "";

}  

// Delete DoTo Elements

function deletecheck(event){
  const item = event.target;
  // Delete ToDo
  if(item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalToDos(todo);
    todo.addEventListener('transitioned', function(){
      todo.remove();
    });
}
  // Check ToDo
  if(item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Filter ToDo Elements

function filterToDo(event){
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains("completed")){
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")){
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo){
  // Check ... 
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){

  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    //create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
      
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // create checked button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="far fa-check" ></i>'; 
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //appened to the list 
    todoList.appendChild(todoDiv);
  });
}

function removeLocalToDos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
