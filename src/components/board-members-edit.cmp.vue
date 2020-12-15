<template>
  <section class="board-members-edit">
    <task-action-container title="Board Members" @close="closeMembers">
      <form-input
        type="text"
        placeholder="Add/Remove Members"
        :debounceInput="true"
        @input="searchUsers"
      />
      <section class="members-container">
        <section
          @click="toggleUser(user)"
          v-for="user in filteredUsers"
          :key="user.username"
          class="member"
        >
          <Avatar :username="user.username" :src="user.img" :size="30" />
          <h4>{{ user.username }}</h4>
          <i v-if="isInBoard(user)" class="el-icon-check v-member"></i>
        </section>
      </section>
    </task-action-container>
  </section>
</template>

<script>
import taskActionContainer from "./task-action-container.cmp";
import formInput from "../components/FormElements/form-input.cmp";
import Avatar from "vue-avatar";
export default {
  name: "board-members-edit",
  components: {
    taskActionContainer,
    formInput,
    Avatar,
  },
  data() {
    return {
      users: null,
      filteredUsers: null,
    };
  },
  computed: {
    currMembers() {
      let board = this.$store.getters.board;
      return board.members;
    },
  },
  async created() {
    this.users = await this.$store.dispatch({ type: "loadUsers" });
    this.filteredUsers=this.users
  },
  methods: {
    searchUsers(text) {
      if (text==="") this.filteredUsers = this.users;
      this.filteredUsers = this.users.filter((user) => {
        if (user.username.toLowerCase().includes(text.toLowerCase())) {
          return user;
        }
      });
    },
    isInBoard(user) {
      return this.currMembers.find((m) => m._id === user._id);
    },
    toggleUser(user) {
      let currMembers = JSON.parse(JSON.stringify(this.currMembers));
      if (this.isInBoard(user)) {
        const idx = currMembers.findIndex((u) => u._id === user._id);
        currMembers.splice(idx, 1);
      } else {
        currMembers.push(user);
      }
      this.$emit("update", currMembers);
    },
    closeMembers() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
