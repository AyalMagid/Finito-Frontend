<template>
  <div>
    <component
      @imageChoosen="setBackground"
      @changeComp="changeComp"
      @colorClicked="setBackground"
      @removeBoard="removeBoard"
      @close="$emit('close')"
      :is="component"
    />
  </div>
</template>

<script>
import sidebarOptions from "./sidebar-options";
import sidebarBackgroundMenu from "./sidebar-background-menu";
import sidebarImg from "./sidebar-img";
import sidebarColor from "./sidebar-color";

export default {
  data() {
    return {
      component: "sidebar-options",
    };
  },
  components: {
    sidebarOptions,
    sidebarBackgroundMenu,
    sidebarImg,
    sidebarColor,
  },
  methods: {
    changeComp(compToRender) {
      this.component = compToRender;
    },
    setBackground(payload) {
      console.log(payload);
      if (payload.color) {
        this.$emit("setBackground", { payload, type: "color" });
      } else {
        this.$emit("setBackground", { payload, type: "img" });
      }
    },
    removeBoard() {
      this.$emit("removeBoard");
    },
  },
};
</script>

<style></style>
