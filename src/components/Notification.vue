<template>
  <v-snackbar value="true">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="primary" text v-bind="attrs" @click="closeClick">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

export default {
  name: "Notification",
  props: {
    index: Number,
    message: String,
  },
  methods: {
    closeClick: function () {
      this.$emit("closeclick", this.index);
    },
  },
};
</script>

<style>
</style>