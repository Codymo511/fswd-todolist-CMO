import $ from 'jquery';

import {
  indexTasks,
  postTask,
  deleteTask
} from "./requests.js";

$(document).ready(function() {
  refreshList();
})

function refreshList() {
  console.log("refreshing list");

  indexTasks(function (response) {
    var htmlString = response.tasks.map(function (task) {
      return (
        '<div class="container"><div class="tasks-row"><div class="content">' + task.content + '</div><div class="col"><button class="delete" data-id="' + task.id + '">Delete</button></div><div class="col"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '</div></div>');
    });

    $("#tasks").html(htmlString);
  });
};

$(document).on('submit','#create-task',function(event){
  event.preventDefault();
  var content = $('#new-task-content').val();
  postTask(content, refreshList)
  $('#new-task-content').val('')
})

$(document).on('click','.delete',function(){
  var id = $(this).data('id');
  deleteTask(id, refreshList)
})
