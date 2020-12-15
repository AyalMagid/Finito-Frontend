<template>
  <task-actions-container
    @close="$emit('close')"
    :fullSize="true"
    @back="$emit('changeComp', 'sidebar-options')"
    :showIcon="true"
    title="Choose background"
  >
    <div class="background-menu">
      <div
        @click="$emit('changeComp', 'sidebar-img')"
        class="background-menu-img"
      >
        <h4>Images</h4>
      </div>
      <div
        @click="$emit('changeComp', 'sidebar-color')"
        class="background-menu-color"
      >
        <h4>Colors</h4>
      </div>
    </div>
  </task-actions-container>
</template>

<script>
import taskActionsContainer from "../task-action-container.cmp";

export default {
  components: {
    taskActionsContainer,
  },
};
</script>

<style lang="scss" scoped>
.background-menu {
  > * {
    height: 205px;
    width: 100%;
    background-size: cover;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    h4 {
      font-size: 30px;
    }
  }
  .background-menu-img {
    background-image: linear-gradient(#0000004c, #0000004c),
      url("../../assets/images/search-img.jpg");
  }
  .background-menu-color {
    background-image: linear-gradient(#0000004c, #0000004c),
      url("../../assets/images/search-color.jpg");
  }
}
</style>
