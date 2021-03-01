<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Todo tech test</div>

      <v-spacer></v-spacer>

      <v-text-field v-model="filter" placeholder="Filter" />

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/polymatter/windsor"
        target="_blank"
        text
      >
        <span class="mr-2">Github Repo</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
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
    filter: "",
  }),
};
</script>
