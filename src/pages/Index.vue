<template>
  <q-page padding>
    <div class="row q-mb-lg">
      <q-input 
      v-model="newTask"
      placeholder="Add new task" 
       class="col"
       @keyup.enter="addTask"/>
      <q-btn 
        color="black"
        size="sm"
        label="Add"
        @click.native="addTask"
        />
    </div>

    <div class="row q-mb-lg" >
      <q-list bordered class="col">
        <q-list-header>Task</q-list-header>
      <q-item v-for="(task, index) in tasks" 
      clickable v-ripple
        @click.native="doneTask(index)"
        >
        <q-item-main :label="task" />
        <q-item-side right 
        icon="check" 
        color="green"
        />
      </q-item>
      </q-list>
    </div>

    <div class="row" >
      <q-list bordered class="col">
        <q-list-header>Done</q-list-header>
      <q-item v-for="(task, index) in done">
        <q-item-main :label="done" />
        <q-item-side right 
        icon="check" 
        color="green"
        />
      </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data(){
    return{
      tasks:[],
      done:[],
      newTask: ""
    }
  },
  methods: {
    addTask(){
        this.tasks.push(this.newTask)
        this.newTask= ''
    },
    doneTask(index){
        this.done.push(this.tasks[index]),
        this.tasks.splice(index,1)
    }
  }
}
</script>
