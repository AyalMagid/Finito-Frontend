<template>
  <div :class="toggleFullSize" class="actions-container">
    <ul class="actions-list">
      <li class="actions-header">
        <i
          @click="$emit('back')"
          :class="iconClass"
          class="icon"
          v-if="showIcon"
        ></i>
        <span>{{ title }}</span>
        <i @click="$emit('close')" class="el-icon-close"></i>
      </li>
      <hr />
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    showIcon: {
      type: Boolean,
    },
    fullSize: {
      type: Boolean,
    },
  },
  computed: {
    iconClass() {
      return `el-icon-back`;
    },
    toggleFullSize() {
      return this.fullSize ? "full-size" : "";
    },
  },
};
</script>

<style scoped lang="scss"></style>
