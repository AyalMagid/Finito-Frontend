<template>
  <div id="app" class="main-layout">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import appHeader from "./components/app-header.cmp.vue";
export default {
  name: "main-app",
  components: {
    appHeader,
  },
};
</script>
