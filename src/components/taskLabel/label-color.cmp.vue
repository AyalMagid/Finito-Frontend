<template>
  <div class="colors-container">
    <div
      :class="{ 'color-clicked': this.color.wasClicked }"
      @click="labelClicked"
      :style="colorObject"
      class="color unique-color"
    >
      <span :class="{ red: this.clickedLabelClass }">{{ color.title }}</span>
    </div>
    <i @click="editLabel" v-if="displayIcon" class="el-icon-edit"></i>
  </div>
</template>

<script>
import { utilService } from "../../utils/utils.js";
export default {
  props: {
    color: {
      type: Object,
    },
    displayIcon: {
      type: Boolean,
    },
    index: {
      type: Number,
    },
    editMode: {
      type: Boolean,
    },
    choosenLabelIndex: {
      type: Number,
    },
    createMode: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    labelClicked() {
      const label = {
        id: this.color.id,
        title: this.color.title,
        color: this.color.color,
        selectedColor: this.color.selectedColor,
        wasClicked: false,
      };
      if (this.createMode) {
        if (!label.id) {
          label.id = utilService.getRandomId();
        }
        this.$emit("createLabel", { label: label, index: this.index });
      }
      this.$emit("labelClicked", { label: label, index: this.index });
    },
    editLabel() {
      // emitting the label that was clicked to be edited.
      const label = {
        id: this.color.id,
        title: this.color.title,
        color: this.color.color,
        selectedColor: this.color.selectedColor,
        wasClicked: this.color.wasClicked,
      };
      this.$emit("editLabel", { label, labelIndex: this.index });
    },
  },
  computed: {
    colorObject() {
      return {
        "--color": this.color.color,
        "--hover-color": this.color.selectedColor,
        "color-clicked": this.color.wasClicked,
        width: this.displayIcon ? "100%" : "100%",
      };
    },
    clickedLabelClass() {
      return this.choosenLabelIndex === this.index && this.editMode
        ? "red"
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.red {
  color: red !important;
}
.color-clicked {
  padding: 30px !important;
}
</style>
