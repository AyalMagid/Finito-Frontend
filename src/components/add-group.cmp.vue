<template>
  <section>
    <section class="add-group-container" @click="show = !show" v-if="!show">
      <i class="el-icon-plus task-icon"></i>
      <span type="text">Add another group</span>
    </section>
    <section v-if="show" class="add-group-content-container">
      <input type="text" class="task-group-title" placeholder="Enter group name" v-model="groupName" autofocus/>
      <section class="add-group-actions flex space-between">
        <button @click="addGroup" :class="{ editActive: show }">
          Add Group
        </button>
        <i @click="show = !show" class="el-icon-close"></i>
      </section>
    </section>
  </section>
</template>

<script>
import { utilService } from "../utils/utils.js";
export default {
  name: "add-group",
  data() {
    return {
      show: false,
      groupName: "",
    };
  },
  methods: {
    addGroup() {
      if (this.groupName === "") return;
      let newGroup = utilService.getEmptyGroup(this.groupName);
      this.groupName = "";
      this.$emit("addGroup", newGroup);
    },
  },
};
</script>

<style></style>
