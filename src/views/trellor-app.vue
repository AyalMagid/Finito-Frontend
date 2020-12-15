<template>
  <div class="trellor-app">
    <board-details />
  </div>
</template>

<script>
import { eventBus, SHOW_MSG } from "../services/event-bus-service.js";
import boardDetails from "./board-details.vue";

export default {
  name: "trellor-app",
  data() {
    return {};
  },
  components: {
    boardDetails,
  },
};
</script>
