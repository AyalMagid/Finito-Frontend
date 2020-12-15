<template>
  <div class="action-list-container">
    <li @click="createCard">Add Card...</li>
    <li @click="duplicateList">Copy Group...</li>
    <li @click="emitCompoenentToRender('move-list', 'Move List')">Move Group...</li>
    <li @click="removeGroup">Remove Group</li>
    <li @click="emitCompoenentToRender('SortBy', 'Sort By')">Sort By...</li>
    <li @click="$emit('watchList')">Watch</li>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    createCard() {
      this.$emit("createCard");
    },
    duplicateList() {
      this.$emit("duplicateList");
    },
    removeGroup() {
      this.$emit("removeGroup");
    },
    emitCompoenentToRender(name, title) {
      this.$emit("compToRender", {
        name,
        title,
        showIcon: true
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
