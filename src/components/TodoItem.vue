<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-actions>
      <v-btn>Edit</v-btn>
      <v-btn color="error">Delete</v-btn>
    </v-card-actions>
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
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
