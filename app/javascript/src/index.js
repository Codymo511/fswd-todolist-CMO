import $ from 'jquery';

import {
  indexTasks,
  postTask,
  deleteTask
} from "./requests.js";


indexTasks(function (response) {
  var htmlString = response.tasks.map(function(task) {
    return "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
      " + task.content + " \
      </div><button class='delete-task' data-id='" + task.id + "'> Delete </button>"  
  },)

  $("#tasks").html(htmlString);
});

$(document).on('submit','#create-task',function(event){
    event.preventDefault();
    var content = $('#new-task-content').val();
    postTask(content)
    indexTasks;
  })
  
  $(document).on('click','.delete-task',function(){
    var id = $(this).data('id');
      deleteTask(id)
      indexTasks;
  })



 


