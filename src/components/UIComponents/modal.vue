<template>
  <div>
    <div
      @click.self="backGroundClicked"
      style="cursor:pointer"
      class="overlay-wrapper"
    >
      <div class="overlay-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    backGroundClicked() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay-wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #00000063;
  opacity: 1;
  z-index: 25;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  margin-bottom: 5rem;
  z-index: 20;
}
.overlay-content {
  z-index: 30;
  position: relative;
  margin: 0 auto;
}
</style>
