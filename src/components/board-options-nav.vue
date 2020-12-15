<template>
  <section class="board-options flex space-between">
    <section class="left-side flex space-between">
      <input
        type="text"
        ref="boardName"
        placeholder="Board Name"
        v-model="board.name"
        @blur="updateName"
      />
      <section class="board-members flex">
        <i class="fas fa-users" @click="toggleAddMember"></i>
        <board-members-edit
          v-if="boardMembersOpen"
          @update="membersUpdate"
          @close="toggleAddMember"
        />
      </section>
    </section>
    <!-- @click.self="isDemoLogin = !isDemoLogin" -->
    <section class="right-side">
      <button class="notification-button" @click="showNotifications = !showNotifications">
        <i class="far fa-bell"></i>
        <span v-if="notificationsExist" class="red-circle"></span>
      </button>
     
      <notifictionList v-show="showNotifications" />
      <button @click="$emit('toggleMenu')">
        <i class="fas fa-bars"></i>
      </button>
      <Avatar
      :size="30"
      :src="loggedUser.img"
      :username="loggedUser.username"
      />
    </section>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import notifictionList from "../components/notification-list.cmp";
import boardMembersEdit from "./board-members-edit.cmp";
export default {
  name: "board-options-nav",
  data() {
    return {
      menuIsOpen: false,
      bgSelectOpen: false,
      boardMembersOpen: false,
      style: { bgColor: "", bgUrl: "" },
      content: "",
      showNotifications: false,
    };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    loggedUser(){
      return this.$store.getters.loggedUser
    },
    notificationsExist() {
      const notifications = this.$store.getters.notifications;
      return notifications.length;
    },
  },
  mounted() {
    this.content = this.board.name;
  },
  methods: {
    updateName() {
      let board = this.board;
      board.name = this.$refs.boardName.value;
      this.$store.dispatch({ type: "saveBoard", board });
    },
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    toggleBgSelect() {
      this.bgSelectOpen = !this.bgSelectOpen;
    },
    toggleAddMember() {
      this.boardMembersOpen = !this.boardMembersOpen;
    },
    membersUpdate(members) {
      let board = this.board;
      board.members = members;
      this.$store.dispatch({ type: "saveBoard", board });
    },
  },
  components: {
    Avatar,
    boardMembersEdit,
    notifictionList,
  },
};
</script>
