<template>
  <div class="todo-list">
    <v-card class="mt-5 mb-5 elevation-5">
      <v-card-title>New Todo</v-card-title>
      <v-card-text>
        <v-text-field id="newTodoTitle" placeholder="New Todo"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          id="createTodoBtn"
          @click="createTodo"
          :loading="isWaitingForAdd"
          >Add</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-divider></v-divider>

    <TodoItem
      v-for="todo in filteredTodos"
      :key="todo.id"
      :title="todo.title"
      :id="todo.id"
      :completed="todo.completed"
      @deleteTodo="deleteTodo"
      @saveTodo="saveTodo"
    />

    <Notification
      v-for="(notification, index) in notifications"
      :key="notification.id"
      :message="notification.message"
      :index="index"
      @closeclick="removeNotification"
    />
  </div>
</template>

<script>
import Vue from "vue";
import TodoItem from "./TodoItem";
import Notification from "./Notification";

const url = "https://jsonplaceholder.typicode.com/todos";

export default {
  name: "TodoList",
  props: {
    filter: String,
  },
  components: {
    TodoItem,
    Notification,
  },

  data: () => ({
    todos: [],
    notifications: [],
    isWaitingForAdd: false,
  }),

  methods: {
    addNotification: function (message) {
      this.notifications.push({
        id: `notifications-${Math.random()}`,
        message,
      });
    },
    updateTodo: function (updatedTodo) {
      const todoIndex = this.todos.findIndex(
        (todo) => todo.id == updatedTodo.id
      );
      Vue.set(this.todos, todoIndex, updatedTodo);
    },
    removeNotification: function (notificationIndex) {
      this.$delete(this.notifications, notificationIndex);
    },
    updateTodos: function () {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.todos = data;
        })
        .catch((reason) => {
          this.addNotification(
            `Error: Failed to update todo list. Please check your network connection`
          );
          console.error(reason);
        });
    },
    createTodo: function () {
      this.isWaitingForAdd = true;
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
          newTodoTitleBox.value = "";

          this.addNotification(`Added ${data.title}`);
        })
        .catch((reason) => {
          this.addNotification(
            `Error: Failed to create todo with the title ${newTodoTitle}`
          );
          console.error(reason);
        })
        .finally(() => {
          this.isWaitingForAdd = false;
        });
    },
    deleteTodo: function (id) {
      const todoTitle = this.todos.find(todo => todo.id == id)?.title;
      fetch(`${url}/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          this.addNotification(`Deleted ${todoTitle}`);
          this.todos = this.todos.filter((todo) => todo.id != id);
        })
        .catch((reason) => {
          this.addNotification(
            `Error: Failed to delete todo with id ${id} and title ${todoTitle}`
          );
          console.error(reason);
        });
    },
    saveTodo: function(newTodo) {
      fetch(`${url}/${newTodo.id}`, {
        method: "PUT",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then(() => {
          this.addNotification(`Updated ${this.todos.find(todo => todo.id == newTodo.id)?.title}`);
        })
        .catch((reason) => {
          const oldTodo = this.todos.find(todo => todo.id == newTodo.id);
          this.addNotification(
            `Error: Failed to update todo with id ${newTodo.id} and title ${oldTodo?.title}`
          );
          console.error(reason);
        });
    },
  },

  computed: {
    filteredTodos: function () {
      return this.todos.filter((todo) =>
        todo.title.match(new RegExp(this.filter, "i"))
      );
    },
  },

  mounted: function () {
    this.updateTodos();
  },
};
</script>

<style>
</style>