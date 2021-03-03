<template>
  <v-card>
    <template>
      <v-card-title
        ><v-checkbox
          :id="checkBoxId"
          v-model="completedModel"
          @click="checkTodo"
          :label="title"
      /></v-card-title>
      <v-card-actions>
        <v-btn :id="deleteBtnId" color="error" @click="deleteTodo" :loading="isWaitingForDelete"
          >Delete</v-btn
        >
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
    completed: Boolean
  },

  data: () => ({
    isWaitingForDelete: false
  }),

  methods: {
    deleteTodo: function () {
      this.isWaitingForDelete = true;
      this.$emit("deleteTodo", this.id);
    },
    checkTodo: function () {
      this.$emit("checkTodo", { id: this.id });
    },
  },

  computed: {
    checkBoxId: function () {
      return `checkBox-${this.id}`;
    },
    deleteBtnId: function () {
      return `deleteBtn-${this.id}`;
    },
    completedModel: {
      get() {
        return this.completed;
      },
      set(completed) {
        const newvalue = { id: this.id, title: this.title, completed }

        return this.$emit("updateTodo", newvalue);
      },
    },
  },
};
</script>

<style scoped>
</style>
