<template>
  <div>
    <button @click="sortBy('newest')" class="btn">
      Date Created(Newest First)
    </button>
    <button @click="sortBy('oldest')" class="btn">
      Date Created(Oldest First)
    </button>
    <button @click="sortBy('alphabet')" class="btn">
     Alphabetically
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    sortBy(order) {
      this.$emit("sortBy", order);
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  width: 100%;
  border: none;
  outline: none;
  background: #fff;
  color: #333;
  padding: 15px 10px;
  margin: 5px 0;
  color: #172b4d;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: rgba(9, 30, 66, 0.04);
  }
}
</style>
