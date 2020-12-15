<template>
  <div>
    <task-action-container
      @close="$emit('close')"
      @back="changeComponent"
      :showIcon="true"
      title="Search for images"
    >
      <searchImg
        orientation="portrait"
        :saveSettings="{ previewSize: 'thumb', saveSize: 'small' }"
        :topImages="topImages"
        @imageChoosen="imageChoosen"
      />
    </task-action-container>
  </div>
</template>

<script>
import taskActionContainer from "../task-action-container.cmp";
import FormInput from "../FormElements/form-input.cmp";
import { UnsplashService } from "../../services/unsplashImage-service";
import searchImg from "../UIComponents/search-img";
export default {
  props: {
    topImages: {
      type: Array,
    },
  },

  methods: {
    imageChoosen(img) {
      this.$emit("imageChoosen", img);
      this.changeComponent();
    },
    changeComponent() {
      this.$emit("changeComponent", "taskCoverColor");
    },
    closeCmp() {
      this.$emit("close");
    },
  },
  computed: {},
  components: {
    taskActionContainer,
    searchImg,
  },
};
</script>

<style scoped lang="scss">
</style>
