<template>
  <v-card>
    <template v-if="mode == 'View'">
      <v-card-title
        ><v-checkbox
          :id="checkBoxId"
          v-model="completedModel"
          @click="checkTodo"
      />{{newTitle}}</v-card-title>
      <v-card-actions>
        <v-btn :id="editBoxId" @click="toggleEditMode" :loading="waitForSave">Edit Title</v-btn>
        <v-btn
          :id="deleteBtnId"
          color="error"
          @click="deleteTodo"
          :loading="isWaitingForDelete"
          >Delete</v-btn
        >
      </v-card-actions>
    </template>
    <template v-else-if="mode == 'Edit'">
      <v-card-title
        ><v-checkbox
          :id="checkBoxId"
          v-model="completedModel"
          @click="checkTodo"
      />
      <v-text-field id="editTitleBox" v-model="newTitle" />
      </v-card-title>
      <v-card-actions>
        <v-btn @click="saveTodo">Save</v-btn>
        <v-btn
          color="error"
          @click="toggleEditMode"
          >Cancel</v-btn
        >
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
const waitingForDeleteTimeout = 5000;

export default {
  name: "Todo",
  props: {
    id: Number,
    title: String,
    completed: Boolean,
    waitForSave: Boolean,
  },

  data: () => ({
    isWaitingForDelete: false,
    mode: "View", //prefer as a string to allow for future extentions/modes
    newTitle: "",
  }),

  methods: {
    toggleEditMode: function() {
      this.mode = this.mode == 'Edit' ? 'View' : 'Edit';
    },
    deleteTodo: function () {
      this.isWaitingForDelete = true;
      this.$emit("deleteTodo", this.id);
      // reset loading icon even if deleting fails
      setTimeout(() => {
        this.isWaitingForDelete = false;
      }, waitingForDeleteTimeout);
    },
    checkTodo: function () {
      this.$emit("saveTodo", { id: this.id, title: this.title, completed: this.completed });
    },
    saveTodo: function () {
      this.$emit("saveTodo", { id: this.id, title: this.newTitle, completed: this.completed })
      this.toggleEditMode();
    }
  },

  computed: {
    checkBoxId: function () {
      return `checkBox-${this.id}`;
    },
    editBoxId: function () {
      return `editBox-${this.id}`;
    },
    deleteBtnId: function () {
      return `deleteBtn-${this.id}`;
    },
    completedModel: {
      get() {
        return this.completed;
      },
      set(completed) {
        const newvalue = { id: this.id, title: this.title, completed };

        return this.$emit("updateTodo", newvalue);
      },
    },
  },

  mounted: function() {
    this.newTitle = this.title;
  }
};
</script>

<style scoped>
</style>
