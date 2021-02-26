<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Todo tech test</div>

      <v-spacer></v-spacer>

      <v-text-field v-model="filter" placeholder="Filter" />
    </v-app-bar>

    <v-main>
      <TodoList :filter="filter" />
    </v-main>
  </v-app>
</template>

<script>
import TodoList from "./components/TodoList";

export default {
  name: "App",

  components: {
    TodoList,
  },

  data: () => ({
    filter: ""
  })
};
</script>
