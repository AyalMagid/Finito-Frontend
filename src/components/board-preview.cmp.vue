<template>
  <div :class="height" :style="background" class="board-preview" @click="moveToBoard">{{board.name}}</div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object
    },
    isLink: {
      type: Boolean
    },
    previewUrl: {
      type: String
    }
  },
  methods: {
    moveToBoard() {
      if (this.isLink) {
        this.$router.push(`/board/${this.board._id}`);
      }
    }
  },
  computed: {
    background() {
      if (this.previewUrl) {
        return `background-image:url("${this.previewUrlComputed}");color:#fff`;
      }
      if (this.board.style.previewUrl) {
        return `background-image:url("${this.board.style.previewUrl}");color:#fff`;
      } else if (this.board.style.bgColor) {
        return `background-color:${this.board.style.bgColor};`;
      }
    },
    height() {
      if (this.isLink) {
        return "short";
      } else {
        return "full";
      }
    },
    previewUrlComputed() {
      return this.previewUrl;
    }
  }
};
</script>

<style>
</style>