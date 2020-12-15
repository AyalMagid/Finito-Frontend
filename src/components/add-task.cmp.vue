<template>
  <div
    :style="{ padding: !inGroup ? '5px' : '' }"
    :class="{ transparent: !inGroup }"
    class="add-task-container"
  >
    <div class="add-task-left-content" @click="toggleEdit" v-if="!show">
      <i class="el-icon-plus task-icon"></i>
      <span type="text">Add another card</span>
    </div>
    <div v-if="show" class="add-task-content-container">
      <textarea :placeholder="placeholderText" v-model="content"></textarea>
      <section class="add-task-actions flex space-between">
        <button @click="addTask" :class="{ editActive: show }">{{ buttonText }}</button>
        <i @click="toggleEdit" class="el-icon-close"></i>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-task",
  props: ["inGroup", "show"],
  data() {
    return {
      items: [],
      content: "",
      showEditSection: false
    };
  },
  methods: {
    toggleEdit() {
      this.$emit("toggleEdit", !this.show);
    },
    addTask() {
      if (this.content) {
        if (this.inGroup) {
          this.$emit("addTask", this.content);
          this.content = "";
        } else {
          this.$emit("addList", this.content);
          this.$emit("toggleEdit", !this.show);
        }
        return;
      }
      alert("tasks cant be empty");
    }
  },
  computed: {
    buttonText() {
      return this.inGroup ? "Add task" : "Add List";
    },
    placeholderText() {
      return this.inGroup ? "Enter Card title..." : "Enter List Title...";
    }
  }
};
</script>

