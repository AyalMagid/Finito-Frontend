<template>
  <section class="attachment-preview">
    <img :src="file.imageUrl" class="file-img" @click="downloadFile" />
    <h6 class="file-name">Name :{{ file.name }}</h6>
    <h6 class="file-created">Added : {{ file.createdAt|relativeTime }}</h6>
    <section class="file-actions">
      <button @click="$emit('cover')">
        <i class="far fa-image"></i> {{ coverStatus }}
      </button>
      <button @click="$emit('remove')">Remove</button>
      <button>Comment</button>
    </section>
  </section>
</template>

<script>
import moment from "moment";
export default {
  name: "attachmen-preview",
  props: ["file", "cover"],
  computed: {
    coverStatus() {
      return this.cover.url === this.file.imageUrl ? "Uncover" : "Make Cover";
    },
  },
  methods: {
    downloadFile() {
      window.open(`${this.file.downloadLink}`);
    },
  },
};
</script>

<style></style>
