<template>
  <v-card>
    <template v-if="!editMode">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-actions>
        <v-btn @click="editTodo">Edit</v-btn>
        <v-btn color="error" @click="deleteTodo">Delete</v-btn>
      </v-card-actions>
    </template>
    <template v-if="editMode">
      <v-card-title v-if="editMode">
        <v-text-field id="editTextBox" v-model="editTitle"></v-text-field>
      </v-card-title>
      <v-card-actions>
        <v-btn @click="saveTodo">Save</v-btn>
        <v-btn color="error" @click="cancelTodo">Cancel</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "Todo",
  props: {
    id: Number,
    title: String,
    completed: Boolean,
  },

  data: () => ({
    editMode: false,
    editTitle: "",
  }),

  methods: {
    cancelTodo: function () {
      this.editMode = false;
    },
    deleteTodo: function () {
      this.$emit("deleteTodo", this.id);
    },
    editTodo: function () {
      this.editTitle = this.title;
      this.editMode = true;
    },
    saveTodo: function () {
      const newTitle = document.querySelector("#editTextBox").value;
      this.$emit("saveTodo", { id: this.id, title: newTitle });
      this.editMode = false;
    },
  },
};
</script>

<style scoped>
</style>
