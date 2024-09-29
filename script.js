 var todo = document.getElementById("todo");
 var description = document.getElementById("description");
 var date = document.getElementById("date");

 var todoVal = "";
 var descriptionVal = "";
 var dateVal = ""
 var id = 0;

 var arr_todo = [];


//  var arr_todo = [];
//  var new_todo = {
//   'title': 'Todo',
//   'description' : 'description'
//  }
//  arr_todo.push(new_todo)
//  console.log(arr_todo)
// localStorage.setItem("todoList", JSON.stringify(arr_todo));

//  var a = localStorage.getItem('todoList');
//  var b = JSON.parse(a)
//  console.log(b[0].title)



 todo.addEventListener('keyup', () => {
  todoVal = todo.value;
 })
 description.addEventListener('keyup', () => {
  descriptionVal = description.value;
 })
 date.addEventListener('change', () => {
  dateVal = date.value;
 })


//  Add Todo List
 var addBtn = document.getElementById("add-btn");
 addBtn.addEventListener('click', () => {
  if(todoVal !== "" && descriptionVal !== "" && dateVal !== ""){
    // Store Todo to local storage
    id += 1;
    console.log(id)
    arr_todo.push({'id' : id,'title': todoVal, 'description': descriptionVal, 'date': dateVal});
    localStorage.setItem('todoList', JSON.stringify(arr_todo));
    var getTodoList = localStorage.getItem('todoList');
    var arr_todoList = JSON.parse(getTodoList);
    var card = "";
    // Populate Todo List
    if(arr_todoList.length !== 0){
      arr_todoList.forEach(item => {
        var TodoList = document.getElementById("TodoList");
     
        card += `
            <div data-id=${item.id} class="card">
            <div class="card-body">
              <h3 class="">${item.title} ${item.id}</h3>
              <p class="card-description">${item.description}</p>
              <p class="card-date">${item.date}</p>
            </div>
            <div class="card-action">
              <button class="card-btn"><img class="card-btn-img" src="assets/pencil_drawing_480px.png" alt="pencil"></button>
              <button class="card-btn"><img class="card-btn-img" src="assets/trash_480px.png" alt="trash"></button>
            </div>
          </div>
          `;

          TodoList.innerHTML = card;
      })
    }
  }
  todo.value = "";
  description.value = "";
  todoVal = "";
  descriptionVal = "";
  date.value = "mm/dd/yyyy";
  dateVal = "";
 });





