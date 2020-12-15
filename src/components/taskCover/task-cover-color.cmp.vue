<template>
  <div>
    <task-action-container @close="$emit('close')" title="Set Cover">
      <div class="colors-container">
        <color-small @colorClicked="colorClicked" size="medium" />
      </div>
      <div class="imgs-container">
        <button @click="removeCover" v-if="isCoverSet" class="btn-primary">Remove Cover</button>
        <h4 class="credits">Images taken from Unsplash</h4>
        <img
          @click="setImage(url.small)"
          :src="url.thumb"
          :key="index"
          v-for="(url, index) in topImages"
          alt
        />
      </div>
      <button
        @click="$emit('changeComponent', 'task-cover-img')"
        class="btn-primary full-width"
      >Search for other photos</button>
    </task-action-container>
  </div>
</template>

<script>
import taskActionContainer from "../task-action-container.cmp";
import colorSmall from "../UIComponents/color-small";
import FormInput from "../FormElements/form-input.cmp";
export default {
  props: {
    topImages: {
      type: Array,
    },
    isCoverSet: {
      type: Boolean,
    },
  },
  created() {
    this.imagesUrl = this.topImages;
  },
  data() {
    return {
      imagesUrl: [],
      query: "",
      searchPhotos: false,
      colors: [
        {
          color: "#61BD4F",
        },
        {
          color: "#f2d600",
        },
        {
          color: "#ff9f1a",
        },
        {
          color: "#eb5a46",
        },
        {
          color: "#0079BF",
        },
        {
          color: "#C377E0",
        },
        {
          color: "#1abc9c",
        },
        {
          color: "#e74c3c",
        },
        {
          color: "#8e44ad",
        },
        {
          color: "#778beb",
        },
        {
          color: "#f78fb3",
        },
        {
          color: "#c44569",
        },
      ],
    };
  },
  methods: {
    colorClicked(color, index) {
      this.$emit("colorClicked", color, index);
    },
    setImage(url) {
      this.$emit("setImage", url);
    },
    removeCover() {
      this.$emit("removeCover");
    },
  },
  computed: {},
  components: {
    taskActionContainer,
    FormInput,
    colorSmall,
  },
};
</script>

<style scoped lang="scss">
h4 {
  font-size: 16px;
}
.imgs-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .credits {
    margin: 5px;
  }
  img {
    cursor: pointer;
    margin: 5px 5px;
    border-radius: 5px;
    width: 78px;
    height: 45px;
    object-fit: cover;
  }
}
.colors-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
