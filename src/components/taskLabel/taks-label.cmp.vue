<template class="task-labels">
  <component
    @selectedColor="selectedColor"
    @back="toggleComponent"
    @toggleCreateComponent="toggleComponent"
    @labelClicked="labelClicked"
    @editLabel="editLabel"
    @createLabel="createLabel"
    @close="closeLabels"
    :editMode="editMode"
    :choosenLabelIndex="choosenLabelIndex"
    :labelToEdit="labelToEdit"
    :choosenColor="choosenColor"
    :title="title"
    :colors="labels"
    :is="component"
  />
</template>

<script>
import TaskActionContainer from "../task-action-container.cmp";
import LabelColor from "./label-color.cmp";
import TaskChooseLabel from "./task-choose-label.cmp";
import TaskCreateLabel from "./task-create-label.cmp";
import { utilService } from "../../utils/utils";

export default {
  props: {
    labels: {
      type: Array,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  components: {
    TaskActionContainer,
    LabelColor,
    TaskChooseLabel,
    TaskCreateLabel,
  },
  data() {
    return {
      component: "task-choose-label",
      choosenColor: "",
      editMode: false,
      choosenLabelIndex: -1,
      title: "",
      newLabel: null,
      labelToEdit: null,
    };
  },
  created() {
    this.board.labels.forEach((label) => {
      if (this.task.labels.some((taskLable) => taskLable.id === label.id)) {
        label.wasClicked = true;
      }
    });
  },
  methods: {
    toggleComponent(component) {
      this.component = component;
      if (component === "task-choose-label") this.editMode = false;
    },
    selectedColor({ name, color }) {
      this.component = name;
      this.choosenColor = color;
    },
    labelClicked(label, index) {
      this.$emit("setLabel", label);
    },
    editLabel(label) {
      this.editMode = true;
      this.choosenLabelIndex = label.labelIndex;
      this.title = label.label.title;
      this.labelToEdit = label.label;
      this.toggleComponent("task-create-label");
    },
    async createLabel(label) {
      if (label.index > -1) {
        this.$emit("editLabel", label);
        this.editMode = false;
      } else {
        this.board.labels.push(label);
        await this.$store.dispatch({ type: "saveBoard", board: this.board });
      }
      this.component = "task-choose-label";
    },
    closeLabels() {
      this.board.labels.forEach((label) => (label.wasClicked = false));
      this.$emit("close");
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
