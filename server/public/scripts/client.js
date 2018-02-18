$(document).ready(onReady);

function onReady(){
    $('#navBar').on('click', '#addTaskButton', addTask);
    $('#navBar').on('click', '#refreshTasksButton', refreshTasks);
    $('#tasks').on('click', '.taskComplete', taskComplete);
    $('#tasks').on('click', '.taskDelete', taskDelete);
    $('#tasks').on('click', '.taskDetails', taskDetails);
    $('#tasks').on('click', '.taskEdit', taskEdit);
    appendDOM(); // None of the DOM functions are variable yet.
} // end onReady

function appendDOM(){
    appendNavBar();
    appendInputFields();
    getAllTasks();
}

function appendNavBar(){

    let stringToAppend = '';
    stringToAppend += `
    <div id="header">Header</div>
    <div id="addTask"><button id="addTaskButton">Add Task</button></div>
    <div id="addTask"><button id="refreshTasksButton">Refresh Tasks</button></div>`
    $('#navBar').empty().append(stringToAppend);
} // end appendNavBar

function appendInputFields(){
    stringToAppend = '';
        stringToAppend += `
        <input type="text" id="taskIn" placeholder="Task"></input>
        <input type="text" id="notesIn" placeholder="Notes"></input>
        <input type="text" id="categoriesIn" placeholder="Category"></input>
        `
        $('#taskInputs').empty().append(stringToAppend);
} // end appendInputFields

function appendTasks(taskArray){
    let stringToAppend = '';
    for(task of taskArray){
    stringToAppend +=`
        <div class="taskItem">
        <div class="taskLabel">${task.title}</div>
        <div class="taskButtons">
            <button type="button" class="taskComplete">Complete</button>
            <button type="button" data-id="${task.id}" class="taskDelete">Delete</button>
            <button type="button" class="taskDetails">Details</button>
        </div>
        <div class="taskDetailsView">
            <div class="taskInfo">
                <div class="taskNotes">${task.notes}</div>
                <button type="button" class="taskEdit">Edit</button>
                <div class="taskCategories">Categories</div>
            </div>
        </div>
        </div>`
    }
    $('#tasks').empty();
    $('#tasks').append(stringToAppend);
} // end appendTasks

function addTask(){
    var objectToSend = {
      task: $('#taskIn').val(),
      notes: $('#notesIn').val(),
      categories: $('#categoriesIn').val()
    }
    $('#taskIn').val('');
    $('#notesIn').val('');
    $('#categoriesIn').val('');
    postTask(objectToSend);
    appendDOM();
} // end addTask

function refreshTasks(){
    appendDOM();
}

function postTask(newTask){
    $.ajax({
      url: '/R1/saveTask',
      type: 'POST',
      data: newTask
    }).done(function(data){
      console.log('postTask (client)', data);
    }).fail(function(error){
      console.log(error)
    }); //end ajax
} // end saveTask

function getAllTasks(){
    console.log('in getAllTasks');
    $.ajax({
        url: '/R1/getAllTasks',
        type: 'GET'
    }).done(function(data){
        console.log('getAllTasks (client)', data);
        appendTasks(data);
    }).fail(function(error){
        console.log(error)
    }); //end ajax
} // end getAllTasks

function taskComplete(){
    console.log('Complete');
}

function taskDelete(){
    let id = $(this).data('id');
    $.ajax({
        type: 'delete',
        url: '/R1/taskDelete',
        data: {'id': id}
    }).done(function(data){
        console.log('taskDelete (client)', data);
        getAllTasks();
    }).fail(function(error){
        console.log(error)
    }); //end ajax
}

function taskDetails(){
    console.log('Details');
}

function taskEdit(){
    console.log('Edit');
}