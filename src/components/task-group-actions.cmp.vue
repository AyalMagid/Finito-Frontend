<template>
  <div>
    <task-action-container @back="back" @close="close" :showIcon="showIcon" :title="title">
      <component
        @duplicateList="duplicateList"
        @removeGroup="removeGroup"
        @createCard="createCard"
        @moveToDifferentBoard="moveToDifferentBoard"
        @compToRender="toggleCompoent"
        @watchList="$emit('watchList')"
        @sortBy="emitSortBy"
        :is="componentToRender"
      />
    </task-action-container>
  </div>
</template>

<script>
import TaskActionContainer from "./task-action-container.cmp";
import ListOfActions from "./taskActions/list-of-actions";
import MoveList from "./taskActions/move-list.cmp";
import SortBy from "./taskActions/sort-by.cmp";
export default {
  data() {
    return {
      componentToRender: "list-of-actions",
      title: "List of Actions",
      showIcon: false,
    };
  },
  components: {
    TaskActionContainer,
    ListOfActions,
    MoveList,
    SortBy,
  },
  methods: {
    resetComponent() {
      this.componentToRender = "list-of-actions";
      this.showIcon = false;
      this.title = "List of Actions";
    },
    moveToDifferentBoard(index) {
      this.$emit("moveToDifferentBoard", index);
    },
    close() {
      this.$emit("close");
      this.resetComponent();
    },
    toggleCompoent(componentToRender) {
      this.componentToRender = componentToRender.name;
      this.title = componentToRender.title;
      this.showIcon = componentToRender.showIcon;
    },
    back() {
      this.resetComponent();
    },
    createCard() {
      this.$emit("createCard");
      this.$emit("close");
    },
    duplicateList() {
      this.$emit("duplicateList");
      this.$emit("close");
    },
    removeGroup() {
      this.$emit("removeGroup");
      this.$emit("close");
    },
    emitSortBy(order) {
      this.$emit("sortBy", order);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped></style>
