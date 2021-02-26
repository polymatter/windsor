<template>
  <div class="todo-list">
    <v-card class="mt-5 mb-5 elevation-5">
      <v-card-title>New Todo</v-card-title>
      <v-card-text>
        <v-text-field id="newTodoTitle" placeholder="New Todo"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="createTodo">Add</v-btn>
      </v-card-actions>
    </v-card>

    <v-divider></v-divider>

    <TodoItem
      v-for="todo in filteredTodos"
      :key="todo.id"
      :title="todo.title"
      :id="todo.id"
      @deleteTodo="deleteTodo"
      @saveTodo="saveTodo"
    />
    <v-snackbar v-model="showDeleted">
      Deleted {{ deletedTitle }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="showDeleted = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="showAdded">
      Added {{ addedTitle }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="showAdded = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="showSaved">
      Saved
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="showSaved = false">
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
  props: {
    filter: String
  },
  components: {
    TodoItem,
  },

  data: () => ({
    todos: [],
    showDeleted: false,
    showAdded: false,
    showSaved: false,
    deletedTitle: "",
    addedTitle: "",
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
      const newTodoTitleBox = document.querySelector("#newTodoTitle");
      const newTodoTitle = newTodoTitleBox.value;
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
        .then((data) => {
          this.todos.splice(0, 0, data);
          this.showAdded = true;
          this.addedTitle = data.title;
          newTodoTitleBox.value = "";
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
    saveTodo: function ({ id, title }) {
      fetch(`${url}/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id,
          title,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.todos = this.todos.filter((todo) => todo.id != id);
          this.todos.splice(0, 0, data);
          this.showSaved = true;
        });
    },
  },

  computed: {
    filteredTodos: function() {
      return this.todos.filter(todo => todo.title.match(this.filter));
    }
  },

  mounted: function () {
    this.updateTodos();
  },
};
</script>

<style>
</style>