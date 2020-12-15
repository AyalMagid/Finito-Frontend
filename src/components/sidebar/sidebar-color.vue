<template>
  <task-actions-container
    @close="$emit('close')"
    :fullSize="true"
    @back="$emit('changeComp', 'sidebar-background-menu')"
    :showIcon="true"
    title="Choose a color"
  >
    <colorSmall
      @colorClicked="$emit('colorClicked', $event)"
      size="extra-large"
    />
  </task-actions-container>
</template>

<script>
import taskActionsContainer from "../task-action-container.cmp";
import colorSmall from "../UIComponents/color-small";

export default {
  components: {
    taskActionsContainer,
    colorSmall,
  },
};
</script>

<style></style>
