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
    />
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
  }),

  methods: {
    updateTodos: function () {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.todos = data;
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