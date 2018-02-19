$(document).ready(onReady);

function onReady(){
    $('#navBar').on('click', '#addTaskButton', addTask);
    $('#tasks').on('click', '.taskComplete', taskComplete);
    $('#tasks').on('click', '.taskDelete', taskDelete);
    appendDOM();
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
    <div id="addTask"><img src="./styles/addButton.png" id="addTaskButton"></div>`
    $('#navBar').empty().append(stringToAppend);
} // end appendNavBar

function appendInputFields(){
    stringToAppend = '';
        stringToAppend += `
        <input type="text" id="taskIn" placeholder="Task"></input>`
        $('#taskInputs').empty().append(stringToAppend);
} // end appendInputFields

function appendTasks(taskArray){
    let stringToAppend = '';
    for(task of taskArray){
    stringToAppend +=`
        <div class="taskItem ${task.complete}" id="${task.id}">
            <div class="taskLabel">${task.title}</div>
            <div class="taskButtons">
                <img src="./styles/completeBox.png" data-id="${task.id}" class="taskComplete">
                <img src="./styles/deleteButton.png" data-id="${task.id}" class="taskDelete">
            </div>
        </div>`
    }
    $('#tasks').empty();
    $('#tasks').append(stringToAppend);
} // end appendTasks

function addTask(){
    var objectToSend = {
      task: $('#taskIn').val(),
    }
    $('#taskIn').val('');
    postTask(objectToSend);
    // appendDOM();
} // end addTask

function postTask(newTask){
    $.ajax({
      url: '/R1/saveTask',
      type: 'POST',
      data: newTask
    }).done(function(data){
      console.log('postTask (client)', data);
      appendDOM();
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
    let id = $(this).data('id');
    $.ajax({
        type: 'put',
        url: '/R1/taskComplete',
        data: {'id': id}
    }).done(function(data){
        console.log('taskComplete (client)', data);
        getAllTasks();
    }).fail(function(error){
        console.log(error)
    }); //end ajax
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