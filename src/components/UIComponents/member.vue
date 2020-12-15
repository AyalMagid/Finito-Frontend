<template>
<section class="member flex space-between" @click="emittoggleMember">
  <div class="member-container" >
    <Avatar :src="member.img" :username="member.username" :size="30" />
    <span class="member-name">{{member.username}}</span>
  </div>
  <slot>
  </slot>
</section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  props: {
    member: {
      type: Object,
      required: true
    },
  },
  components: {
    Avatar
  },
     methods: {
      emittoggleMember() {
        this.$emit("toggleMember");
      }
    }
};
</script>

<style lang="scss" scoped>

</style>