<template>
  <div>
    <h1>Edit Task</h1>
    <form class="custom-form" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="task.title" type="text" class="form-control" id="title" name="title" placeholder="Title" />
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea v-model="task.body" name="body" class="form-control" id="body" cols="30" rows="10" placeholder="Body"></textarea>
      </div>
      <div class="form-group">
        <label for="due-date">Due Date</label>
        <input v-model="task.dueDate" type="date" class="form-control" id="due-date" name="due-date" placeholder="Due Date" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-secondary">Save changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import * as taskService from '../../services/TaskService'
import moment from 'moment'

export default{
  name: 'tasks-edit',
  data: function(){
    return {
      task: {
        title: '',
        body: '',
        dueDate: ''
      }
    };
  },
  beforeRouteEnter(to, from, next){
    taskService.getTaskById(to.params.id)
    .then(res => {
      if(!res){
        next('/tasks');
      }
      else {
        next(vm => {
          const task = res.data.task;
          task.dueDate = moment(task.dueDate).format('YYYY-MM-DD');
          vm.task = task;
        });
      }
    });
  },
  methods: {
    onSubmit: async function(){
      const request = {
        task: this.task
      };
      await taskService.updateTask(request);
      this.$router.push({name: 'tasks-all'});
    }
  }
}
</script>
