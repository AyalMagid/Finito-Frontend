<template>
  <div class="form-select-container">
    <label v-if="showLabel">{{ labelText }}</label>
    <div @click="showOptions = !showOptions" class="form-select">
      <span>{{ options[0] }}</span>
      <div v-if="showOptions" class="options">
        <div
          @click="$emit('selected', { option, index })"
          :key="index"
          v-for="(option, index) in options"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOptions: false,
    };
  },
  props: {
    showLabel: {
      type: Boolean,
    },
    labelText: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-select-container {
  label {
    text-transform: capitalize;
    margin-top: 20px;
    font-size: 14px;
    padding: 10px;
  }
  .form-select {
    position: relative;
    width: 100%;
    border: none;
    outline: none;
    background: rgba(9, 30, 66, 0.04);
    color: #333;
    padding: 10px;
    .options {
      z-index: 3;
      width: 100%;
      top: 0;
      left: 0;
      background-color: #fff;
      position: absolute;
      box-shadow: rgba(56, 56, 56, 0.25) 4px 4px 8px 0px,
        rgba(71, 71, 71, 0.06) -8px -8px 12px 0px;
      > * {
        padding: 10px 10px;
        transition: all 0.3s ease-in-out;
        &:hover {
          background: rgba(9, 30, 66, 0.04);
        }
      }
    }
  }
}
</style>
