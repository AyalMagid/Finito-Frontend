<template>
  <section class="task-comment">
    <Avatar username="Asaf Cohen" :size="30" />
    <input type="text" placeholder="Write a comment">
    <button @click="addComment">Save</button>
  </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  name: "task-comment",
  components: {
    Avatar,
  },
  methods:{
      addComment(){}
  }
};
</script>

<style></style>
