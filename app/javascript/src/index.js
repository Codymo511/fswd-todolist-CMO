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
        "<div class='col-12 mb-3 p-2 border rounded task' data-id='" +
        task.id +
        "'> \
        " +
        task.content +
        " \
        </div><button class='delete-task' data-id='" +
        task.id +
        "'> Delete </button>"
      );
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

$(document).on('click','.delete-task',function(){
  var id = $(this).data('id');
  deleteTask(id, refreshList)
})
