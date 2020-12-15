<template>
  <div>
    <component
      :isCoverSet="isCoverSet"
      @changeComponent="toggleComp"
      @setImage="setImage"
      :topImages="imagesUrl"
      :is="component"
      @imageChoosen="addImage"
      @colorClicked="colorClicked"
      @removeCover="removeCover"
      @close="$emit('close')"
    ></component>
  </div>
</template>

<script>
import taskCoverColor from "./task-cover-color.cmp";
import taskCoverImg from "./task-cover-image";
import { UnsplashService } from "../../services/unsplashImage-service";
export default {
  props: {
    isCoverSet: {
      type: Boolean
    },
    imageSize: {
      type: String,
      default: "small"
    }
  },
  async created() {
    this.imagesUrl = await UnsplashService.getRandomPhotos("9", "landscape");
  },
  data() {
    return {
      component: "taskCoverColor",
      imagesUrl: []
    };
  },
  methods: {
    toggleComp(compoentToRender) {
      this.component = compoentToRender;
    },
    addImage({ saveSize, previewUrl }) {
      const img = {
        small: saveSize,
        thumb: previewUrl
      };
      this.imagesUrl.unshift(img);
    },
    colorClicked(color, index) {
      this.$emit("setCover", { payload: color.color, type: "color" });
    },
    setImage(url) {
      this.$emit("setCover", { payload: url, type: "image" });
    },
    removeCover() {
      this.$emit("removeCover");
    }
  },
  computed: {},
  components: {
    taskCoverColor,
    taskCoverImg
  }
};
</script>

<style scoped lang="scss">
</style>
