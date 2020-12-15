<template>
  <div>
    <h4 class="credits">Images taken from Unsplash</h4>
    <form-input
      :showLabel="true"
      labelText="search for image"
      :debounceInput="true"
      v-model="query"
      @input="searchForPhotos"
    />
    <div v-if="!isLoading" class="imgs-container">
      <img
        :class="imageSize"
        @click="imageChoosen(url, index)"
        :src="url[imageDisplaySize]"
        :key="index"
        v-for="(url, index) in imagesToDisplay"
      />
    </div>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
import formInput from "../FormElements/form-input.cmp";
import { UnsplashService } from "../../services/unsplashImage-service";
export default {
  props: {
    topImages: {
      type: Array,
    },
    orientation: {
      type: String,
    },
    imageDisplaySize: {
      type: String,
      default: "thumb",
    },
    saveSettings: {
      type: Object,
    },
    getAllSizes: {
      type: Boolean,
    },
    imageAmount: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  data() {
    return {
      searchedImages: [],
      query: "",
      isLoading: false,
    };
  },
  methods: {
    async searchForPhotos() {
      this.isLoading = true;
      const imgAmount = this.imageAmount ? this.imageAmount : "9";
      const orientation = this.orientation ? this.orientation : "landscape";
      this.searchedImages = await UnsplashService.searchPhoto(
        this.query,
        imgAmount,
        orientation
      );
      this.isLoading = false;
    },
    imageChoosen(url, index) {
      const { previewSize, saveSize } = this.saveSettings;
      let img = {
        thumbnail: url["thumb"],
      };
      if (this.getAllSizes) {
        img.small = url["small"];
        img.regular = url["regular"];
        img.full = url["full"];
      } else {
        if (previewSize) {
          img.previewUrl = url[previewSize];
        }
        if (saveSize) {
          img.saveSize = url[saveSize];
        }
      }
      this.$emit("imageChoosen", img);
    },
  },
  components: {
    formInput,
  },
  computed: {
    imagesToDisplay() {
      return this.searchedImages.length ? this.searchedImages : this.topImages;
    },
    imageSize() {
      if (this.size) {
        if (this.size === "large") {
          return "large";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.credits {
  margin: 5px;
}
.imgs-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .credits {
    font-size: 14px;
  }
  img {
    cursor: pointer;
    margin: 5px 5px;
    border-radius: 5px;
    width: 78px;
    height: 50px;
    object-fit: cover;
    &.large {
      width: 100px;
      height: 60px;
      @media only screen and(max-width:380px) {
        width: 65px;
        height: 50px;
      }
    }
  }
}
</style>
