<template>
  <task-action-container
    title="Add Checklist"
    class="add-checklist-cmp"
    @close="closeChecklist"
  >
    <form-input
      :showLabel="true"
      labelText="List Title"
      v-model="title"
      type="text"
    />
    <button @click="createCheckList" class="btn-primary full-width">Add</button>
  </task-action-container>
</template>

<script>
import TaskActionContainer from "./task-action-container.cmp";
import FormInput from "./FormElements/form-input.cmp";

export default {
  components: {
    TaskActionContainer,
    FormInput,
  },
  data() {
    return {
      title: "New Check List",
    };
  },
  methods: {
    createCheckList() {
      if (this.title) {
        this.$emit("createCheckList", this.title);
        this.$emit("close");
      }
    },
    closeChecklist() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss"></style>
