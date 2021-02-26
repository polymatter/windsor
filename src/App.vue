<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Todo tech test</div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <TodoList />
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
};
</script>
