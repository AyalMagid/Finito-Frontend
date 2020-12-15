<template>
  <task-action-container
    @back="$emit('back', 'task-choose-label')"
    :title="editMode ? 'Edit Label' : 'Create Label'"
    :showIcon="true"
  >
    <div class="task-create-label-container">
      <li>
        <label>Name</label>
        <form-input v-model="labelText" />
      </li>
      <span>Labels</span>
      <li>
        <label>Select Color</label>
        <label-color
          :choosenLabelIndex="choosenLabelIndex"
          :color="color"
          :key="index"
          :index="index"
          :editMode="editMode"
          :title="title"
          :createMode="!editMode"
          @editLabel="editLabel"
          @labelClicked="labelClicked"
          @createLabel="createLabel"
          v-for="(color, index) in newColors"
        />
      </li>
      <button class="btn-primary full-width" @click="createNewLabel">
        {{ this.editMode ? "Save" : "Create" }}
      </button>
    </div>
  </task-action-container>
</template>

<script>
import TaskActionContainer from "../task-action-container.cmp";
import LabelColor from "./label-color.cmp";
import formInput from "../FormElements/form-input.cmp";
export default {
  props: {
    choosenColor: {
      type: String,
    },
    title: {
      type: String,
    },
    editMode: {
      type: Boolean,
    },
    choosenLabelIndex: {
      type: Number,
    },
    colors: {
      type: Array,
    },
    labelToEdit: {
      type: Object,
    },
  },
  components: {
    TaskActionContainer,
    LabelColor,
    formInput,
  },
  mounted() {
    if (this.title && this.editMode) {
      this.labelText = this.title;
    }
  },
  data() {
    return {
      labelText: "",
      labelToCreate: null,
      labelToEditIndex: -1,
      newColors: [
        {
          title: "",
          color: "#61BD4F",
          selectedColor: "#519839",
          wasClicked: false,
        },
        {
          title: "",
          color: "#f2d600",
          selectedColor: "#D9B51C",
          wasClicked: false,
        },
        {
          title: "",
          color: "#ff9f1a",
          selectedColor: "#cd8313",
          wasClicked: false,
        },
        {
          title: "",
          color: "#eb5a46",
          selectedColor: "#b04632",
          wasClicked: false,
        },
        {
          title: "",
          color: "#0079BF",
          selectedColor: "#055A8C",
          wasClicked: false,
        },
        {
          title: "",
          color: "#C377E0",
          selectedColor: "#89609E",
          wasClicked: false,
        },
      ],
    };
  },
  methods: {
    createNewLabel() {
      if (!this.editMode) {
        if (this.labelToCreate) {
          this.labelToCreate.title = this.labelText;
          this.$emit("createLabel", this.labelToCreate);
        }
      } else {
        this.colors[this.labelToEdit.index] = this.labelText;
        if (this.labelText) {
          this.labelToEdit.title = this.labelText;
        }
        //making sure the label wont be cliked upon next render cycle
        this.labelToEdit.wasClicked = false;
        this.$emit("createLabel", {
          label: this.labelToEdit,
          index: this.choosenLabelIndex,
        });
      }
    },
    createLabel({ label, index }) {
      this.labelToCreate = label;
    },
    labelClicked(label) {
      this.newColors.forEach((color, colorIndex) => {
        if (label.index === colorIndex) {
          color.wasClicked = true;
        } else {
          color.wasClicked = false;
        }
      });
    },
    editLabel(index) {
      this.labelToEditIndex = index;
    },
  },
  computed: {
    isCreateMode() {
      return !this.editMode;
    },
  },
  created() {
    if (this.choosenLabelIndex||this.choosenLabelIndex >= -1) {
      this.newColors[this.choosenLabelIndex].wasClicked = !this.newColors[
        this.choosenLabelIndex
      ].wasClicked;
    }
  },
};
</script>

<style lang="scss" scoped>
.task-create-label-container {
  .task-label-search {
    width: 100%;
    padding: 5px;
  }
}
</style>
