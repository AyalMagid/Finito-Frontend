<template>
  <task-actions-container @close="$emit('close')" :fullSize="true" title="menu">
    <div>
      <button class="btn menu-login-btn" @click="navToAuth('signUp')">Signup</button>
      <button class="btn menu-login-btn" @click="navToAuth('login')">Sign In</button>
    </div>
    <div
      @click="$emit('changeComp', 'sidebar-background-menu')"
      class="sidebar-menu-container menu-action"
    >
      <img src="../../assets/images/color-icon.svg" alt />
      <span>Change Background</span>
    </div>
    <div class="sidebar-menu-container menu-action">
      <i class="el-icon-pie-chart"></i>
      <router-link to="/board/dash/charts" tag="span">Board Activity</router-link>
    </div>
    <div @click="$emit('removeBoard')" class="sidebar-menu-container">
      <i class="el-icon-delete"></i>
      <span>Remove Board</span>
    </div>

    <div class="sidebar-menu-container menu-activity">
      <i class="fas fa-list"></i>
      <span>Board Statistics</span>
    </div>
    <hr />
    <activity :activities="board.activities" />
  </task-actions-container>
</template>

<script>
import taskActionsContainer from "../task-action-container.cmp";
import activity from "../UIComponents/activity";
export default {
  components: {
    taskActionsContainer,
    activity,
  },
  methods: {
    navToAuth(pageName) {
      let isLogin;
      if (pageName === "login") {
        isLogin = true;
      } else {
        isLogin = false;
      }
      this.$router.push({
        name: "auth",
        params: {
          isLogin,
        },
      });
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
