 var todo = document.getElementById("todo");
 var description = document.getElementById("description");
 var date = document.getElementById("date");
 var updateBtn = document.getElementById("update-btn");
 var addBtn = document.getElementById("add-btn");
 var errorText = document.getElementById('error-container');
 var error = localStorage.setItem('error', '');

 var todoVal = "";
 var descriptionVal = "";
 var dateVal = ""
 var card = "";


 window.addEventListener('load', function(){
  // sessionStorage.clear();
  retrieve();
  var editId;


  //  Add Button Todo List
  addBtn.addEventListener('click', () => {
    if(todoVal !== "" && descriptionVal !== "" && dateVal !== ""){
      store(todoVal, descriptionVal, dateVal);
      retrieve();
    } else {
      errorText.innerHTML = `<p class="error-text">Please fill in all fields.</p>`;
      
    }
      clear();
  });

  //  Delete Button Todo List
  var deleteButtons = document.getElementsByName('delete-button');
    deleteButtons.forEach(deleteBtn => {
      deleteBtn.addEventListener('click', function() {
        const attributeValue = this.getAttribute('data-id');
        deleteTodoList(attributeValue);
      });
    });

    // Edit Button Todo List
    var editButtons = document.getElementsByName('edit-button');
    editButtons.forEach(editBtn => {
      editBtn.addEventListener('click', function(){
        const attributeValue = this.getAttribute('data-id');
        editId = editButton(attributeValue);
         
      });
    });

    // Update Button Todo List
    updateBtn.addEventListener('click', ()=>{
      updateTodoList(editId);
    });

 });




 todo.addEventListener('keyup', () => {
  todoVal = todo.value;
 })
 description.addEventListener('keyup', () => {
  descriptionVal = description.value;
 })
 date.addEventListener('change', () => {
  dateVal = date.value;
 })



 //  Retrieve Todo List
 function retrieve(){
  if(sessionStorage.getItem('todoList') != null){
    card = "";
    var todoListStorage = sessionStorage.getItem('todoList');
    var toArray = JSON.parse(todoListStorage);
    var TodoList = document.getElementById("TodoList");
    toArray.map(item => {
      card += `
          <div class="card">
          <div class="card-body">
            <h3 class="">${item.title}</h3>
            <p class="card-description">${item.description}</p>
            <p class="card-date">${item.date}</p>
          </div>
          <div class="card-action">
            <button data-id=${item.id} id="edit-btn${item.id}"   class="card-btn" name="edit-button"><img class="card-btn-img" src="assets/pencil_drawing_480px.png" alt="pencil"></button>
            <button data-id=${item.id}  id="delete-btn" class="card-btn" name="delete-button"><img class="card-btn-img" src="assets/trash_480px.png" alt="trash"></button>
          </div>
        </div>
        `;
        TodoList.innerHTML = card;
    });
  }
}



//  Store Todo List
function store( todoVal, descriptionVal, dateVal ){
  // Check if there is current session storage
  if(sessionStorage.getItem('todoList') != null){
    var getTodoList = sessionStorage.getItem('todoList');
    var toArray = JSON.parse(getTodoList);
    var id = sessionStorage.getItem('id');
    var data_id = 1 + parseInt(id);
    toArray.push({'id' : data_id,'title': todoVal, 'description': descriptionVal, 'date': dateVal});
    sessionStorage.setItem('todoList', JSON.stringify(toArray));
    sessionStorage.setItem('id', data_id);
    location.reload();
    return toArray;
  } else {
    // push to local array
    var data_id = 0;
    var arr_todo = [];
     arr_todo.push({'id' : data_id,'title': todoVal, 'description': descriptionVal, 'date': dateVal});
    sessionStorage.setItem('todoList', JSON.stringify(arr_todo));
    var id = sessionStorage.setItem('id', data_id);
    location.reload();
    return arr_todo;
  }
}



// Delete Todo List
function deleteTodoList(attributeId){
    if(sessionStorage.getItem('todoList') != null){
      var currentTodoList = sessionStorage.getItem("todoList");
      var currentTodoListArr = JSON.parse(currentTodoList);
      currentTodoListArr.map(item => {
        if(attributeId == item.id){
          currentTodoListArr = currentTodoListArr.filter(todoArr => todoArr.id != attributeId);
          sessionStorage.setItem('todoList', JSON.stringify(currentTodoListArr));
          location.reload();
        }
      });
    }
}


// Edit button
function editButton(attributeId){
  if(sessionStorage.getItem('todoList') != null){
    var currentTodoList = sessionStorage.getItem("todoList");
    var currentTodoListArr = JSON.parse(currentTodoList);
    var id;

    currentTodoListArr.map(item => {
      if(attributeId == item.id){
        updateBtn.disabled = false;
        addBtn.disabled = true;
        todo.value = item.title;
        description.value = item.description;
        date.value = item.date;
        todoVal = item.title;
        descriptionVal = item.description;
        dateVal = item.date;
        id = item.id
      }
    });  
    return id;
  }
}

// Update button
 function updateTodoList(attributeId){
  var currentTodoList = sessionStorage.getItem('todoList');
  var currentTodoListArr = JSON.parse(currentTodoList);
  let updatedTodo = currentTodoListArr.map(item => {
    if (item.id === attributeId) {

        return { ...item, title: todoVal , description: descriptionVal, date: dateVal };  
    }
    return item;  
  });
  sessionStorage.setItem('todoList', JSON.stringify(updatedTodo));
  location.reload();
 }




  // Clear  
  function clear(){
  todo.value = "";
  description.value = "";
  todoVal = "";
  descriptionVal = "";
  date.value = "mm/dd/yyyy";
  dateVal = "";
  }




