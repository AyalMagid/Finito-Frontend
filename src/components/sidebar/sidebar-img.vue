<template>
  <task-actions-container
    @close="$emit('close')"
    :fullSize="true"
    @back="$emit('changeComp', 'sidebar-background-menu')"
    :showIcon="true"
    title="search for images"
  >
    <search-img
      @imageChoosen="$emit('imageChoosen', $event)"
      :getAllSizes="true"
      :topImages="topImages"
      :saveSettings="{ previewSize: 'regular', saveSize: 'full' }"
      imageAmount="15"
      size="large"
    />
  </task-actions-container>
</template>

<script>
import taskActionsContainer from "../task-action-container.cmp";
import searchImg from "../UIComponents/search-img";
import { UnsplashService } from "../../services/unsplashImage-service.js";
export default {
  async created() {
    this.topImages = await UnsplashService.getRandomPhotos("15", "landscape");
  },
  data() {
    return {
      topImages: [],
    };
  },
  components: {
    taskActionsContainer,
    searchImg,
  },
};
</script>

<style></style>
