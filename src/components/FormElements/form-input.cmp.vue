<template>
  <div class="form-input-container">
    <label v-if="showLabel">{{ labelText }}</label>
    <input
      class="form-input"
      :type="type"
      :value="value"
      @input.prevent="$emit('input', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  created() {
    if (this.debounceInput) {
      this.emitInput = this.debounce(this.emitInput, 400);
    }
  },
  methods: {
    debounce(fn, delay) {
      let timer;
      return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
        }, delay);
      };
    },
    emitInput(event) {
      this.$emit("input", $event.target.value);
    },
  },
  props: {
    showLabel: {
      type: Boolean,
    },
    labelText: {
      type: String,
    },
    type: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
    debounceInput: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-input-container {
  label {
    text-transform: capitalize;
    margin-top: 10px;
    font-size: 14px;
  }
  .form-input {
    margin-bottom: 5px;
    margin-top: 5px;
    width: 100%;
    padding: 5px;
    outline: none;
    font-size: 15px;
    border: 1px solid #3498db;
    &.error {
      border: 1px solid #e63946;
    }
  }
}
</style>
