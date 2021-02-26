<template>
  <div class="todo-list">
    <v-card>
      <v-card-text>
        <v-text-field id="newTodoTitle" placeholder="New Todo"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="createTodo">Add</v-btn>
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
    deletedTitle: "",
  }),

  methods: {
    updateTodos: function () {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.todos = data;
        });
    },
    createTodo: function () {
      const newTodoTitle = document.querySelector('#newTodoTitle').value;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          title: newTodoTitle,
          completed: false,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then(data => {
          this.todos.splice(0, 0, data);
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