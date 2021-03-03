<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Todo tech test</div>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="filterTitle"
        placeholder="filter by title (regex support, case insensitive)"
      />

      <v-spacer></v-spacer>

      <v-col cols="3">
      <v-select
        v-model="filterCompletedSelected"
        :items="filterCompletedFunctions"
        :hint="`${filterCompletedSelected.label}`"
        item-text="label"
        item-value="func"
        persistent-hint
        return-object
        single-line
      ></v-select>
      </v-col>
      <v-btn href="https://github.com/polymatter/windsor" target="_blank" text>
        <span class="mr-2">Github Repo</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <TodoList
        :filterFunction="finalFilterFunction"
      />
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
    filterTitle: "",
    filterCompletedFunctions: [
      {
        label: "Show All",
        func: function (todos) {
          return todos;
        },
      },
      {
        label: "Uncompleted Only",
        func: function (todos) {
          return todos.filter((todo) => !todo.completed);
        },
      },
      {
        label: "Completed Only",
        func: function (todos) {
          return todos.filter((todo) => todo.completed);
        },
      },
    ],
    filterCompletedSelected: {
      label: "Show All",
      func: function (todos) {
        return todos;
      },
    },
  }),

  methods: {
    compose: function(f1, f2) {
      return value => f2(f1(value));
    },
    filterByTitle: function(todos) {
      let regex;
      try {
        const CASE_INSENSITIVE = "i";
        regex = new RegExp(this.filterTitle, CASE_INSENSITIVE)
      } catch {
        return todos;
      }
      return todos.filter(todo => todo.title.match(regex));
    }
  },

  computed: {
    filterFunction: function () {
      return () => "hi";
    },
    filterCompletedOptions: function () {
      return this.filterCompletedFunctions.map((option) => option.prompt);
    },
    finalFilterFunction: function() {
      return this.compose(this.filterCompletedSelected.func, this.filterByTitle);
    }
  },
};
</script>
