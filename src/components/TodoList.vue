<template>
  <div class="todo-list">
    <v-card>
      <v-card-text>
        <v-text-field placeholder="New Todo"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary">Add</v-btn>
      </v-card-actions>
    </v-card>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :title="todo.title"
      :id="todo.id"
      @deleteTodo="deleteTodo"
    />
    <v-snackbar v-model="showDeleted">
      Deleted {{ deletedTitle }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="showDeleted = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

const url = "https://jsonplaceholder.typicode.com/todos";

export default {
  name: "TodoList",

  components: {
    TodoItem,
  },

  data: () => ({
    todos: [],
    showDeleted: false,
    deletedTitle: ''
  }),

  methods: {
    updateTodos: function () {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.todos = data;
        });
    },
    deleteTodo: function (id) {
      fetch(`${url}/${id}`, {
        method: "DELETE",
      }).then(() => {
        this.showDeleted = true;
        this.deletedTitle = this.todos.filter((todo) => todo.id == id)[0].title;
        this.todos = this.todos.filter((todo) => todo.id != id);
      });
    },
  },

  mounted: function () {
    this.updateTodos();
  },
};
</script>

<style>
</style>