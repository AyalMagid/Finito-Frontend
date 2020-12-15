<template>
  <task-action-container @close="$emit('close')" title="Labels">
    <div class="task-label-container">
      <li>
        <form-input
          :showLabel="true"
          labelText="search your labels"
          v-model="labelText"
          type="text"
        />
      </li>
      <li>
        <label-color
          :displayIcon="true"
          :color="color"
          :key="index"
          :index="index"
          v-for="(color, index) in labelsToDisplay"
          @labelClicked="labelClicked"
          @editLabel="editLabel"
        />
      </li>
      <button class="btn-primary full-width" @click="createNewLabel">
        Create new Label
      </button>
    </div>
  </task-action-container>
</template>

<script>
import TaskActionContainer from "../task-action-container.cmp";
import LabelColor from "./label-color.cmp";
import FormInput from "../FormElements/form-input.cmp";
export default {
  props: {
    colors: {
      type: Array,
    },
  },
  components: {
    TaskActionContainer,
    LabelColor,
    FormInput,
  },
  data() {
    return {
      labelText: "",
    };
  },
  methods: {
    createNewLabel() {
      this.$emit("toggleCreateComponent", "task-create-label");
    },
    labelClicked({ label, index }) {
      this.$emit("labelClicked", label, index);
      this.colors[index].wasClicked = !this.colors[index].wasClicked;
    },
    editLabel(label) {
      this.$emit("editLabel", label);
    },
  },
  computed: {
    labelsToDisplay() {
      const searchTerm = this.labelText.toLowerCase();
      return this.colors.filter((color) =>
        color.title.toLowerCase().includes(searchTerm)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.task-label-container {
  .task-label-search {
    width: 100%;
    padding: 5px;
  }
}
</style>
