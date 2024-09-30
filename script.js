 var todo = document.getElementById("todo");
 var description = document.getElementById("description");
 var date = document.getElementById("date");

 var todoVal = "";
 var descriptionVal = "";
 var dateVal = ""
 var id = 0;
 var card = "";
 var arr_todo = [];

//  var arr_todo = [];


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
    id += 1;
    // Store Todo to local storage
    // arr_todo.push({'id' : id,'title': todoVal, 'description': descriptionVal, 'date': dateVal});
    // localStorage.setItem('todoList', JSON.stringify(arr_todo));
    // var getTodoList = localStorage.getItem('todoList');
    // var arr_todoList = JSON.parse(getTodoList);
    // Populate Todo List
    // if(arr_todoList.length !== 0){
    //   arr_todoList.forEach(item => {
    //     var TodoList = document.getElementById("TodoList");
     
    //     card += `
    //         <div class="card">
    //         <div class="card-body">
    //           <h3 class="">${item.title} ${item.id}</h3>
    //           <p class="card-description">${item.description}</p>
    //           <p class="card-date">${item.date}</p>
    //         </div>
    //         <div class="card-action">
    //           <button  class="card-btn"><img class="card-btn-img" src="assets/pencil_drawing_480px.png" alt="pencil"></button>
    //           <button data-id=${item.id} id="delete-btn${item.id}" class="card-btn"><img class="card-btn-img" src="assets/trash_480px.png" alt="trash"></button>
    //         </div>
    //       </div>
    //       `;

    //       TodoList.innerHTML = card;
    //   })
    // }
    var newTodoList = store(arr_todo, id, todoVal, descriptionVal, dateVal);
    retrieve(newTodoList, card);
  
  }

  clear();

  deleteTodoList();
  // var currentTodoList = localStorage.getItem("todoList");
  // var currentTodoListArr = JSON.parse(currentTodoList);
  
  // if(currentTodoListArr.length !== 0){
  //   currentTodoListArr.forEach(item => {
  //     var deleteBtn = document.getElementById(`delete-btn${item.id}`);
  //     var data_id = deleteBtn.getAttribute('data-id');
  //     var card = "";
      
  //     deleteBtn.addEventListener('click', () => {
        
  //       currentTodoListArr = currentTodoListArr.filter(todoArr => todoArr.id != data_id )
  //       console.log(currentTodoListArr)
        
  //       var deleteTodoList = localStorage.setItem("todoList", JSON.stringify(currentTodoListArr));
  //       var updatedTodoList = localStorage.getItem("todoList");
  //       console.log(JSON.parse(updatedTodoList))
  //       retrieve(JSON.parse(updatedTodoList), card);
  //     });
      
  //   })
  // }

 });





//  Store Todo List
function store(arr_todo, id, todoVal, descriptionVal, dateVal ){
  
  arr_todo.push({'id' : id,'title': todoVal, 'description': descriptionVal, 'date': dateVal});
  localStorage.setItem('todoList', JSON.stringify(arr_todo));
  var getTodoList = localStorage.getItem('todoList');
  var arr_todoList = JSON.parse(getTodoList);

  return arr_todoList;
}



// Delete Todo List
function deleteTodoList(){
  var currentTodoList = localStorage.getItem("todoList");
  var currentTodoListArr = JSON.parse(currentTodoList);
  

  if(currentTodoListArr.length !== 0){
    currentTodoListArr.forEach(item => {
      var deleteBtn = document.getElementById(`delete-btn${item.id}`);
      var data_id = deleteBtn.getAttribute('data-id');
      
      if(item.id == data_id){
        deleteBtn.addEventListener('click', () => {
        
          currentTodoListArr = currentTodoListArr.filter(todoArr => todoArr.id != data_id )
          console.log(currentTodoListArr)
          
          var updatedTodoList = localStorage.setItem("todoList", JSON.stringify(currentTodoListArr));
          var updatedTodoList = localStorage.getItem("todoList");
          var toArray = JSON.parse(updatedTodoList);
          console.log(JSON.parse(updatedTodoList));
          card = "";
          arr_todo = toArray;
          retrieve(toArray, card);
        });
      }
      
      
    })
  }
}



//  Retrieve Todo List
  function retrieve(arr, card){
    if(arr.length !== 0){
      arr.forEach(item => {
        var TodoList = document.getElementById("TodoList");
     
        card += `
            <div class="card">
            <div class="card-body">
              <h3 class="">${item.title} ${item.id}</h3>
              <p class="card-description">${item.description}</p>
              <p class="card-date">${item.date}</p>
            </div>
            <div class="card-action">
              <button  class="card-btn"><img class="card-btn-img" src="assets/pencil_drawing_480px.png" alt="pencil"></button>
              <button data-id=${item.id}  id="delete-btn${item.id}" class="card-btn"><img class="card-btn-img" src="assets/trash_480px.png" alt="trash"></button>
            </div>
          </div>
          `;

          TodoList.innerHTML = card;
      })
    }
  }

  function clear(){
  todo.value = "";
  description.value = "";
  todoVal = "";
  descriptionVal = "";
  date.value = "mm/dd/yyyy";
  dateVal = "";
  }




