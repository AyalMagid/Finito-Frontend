<template>
  <section class="task-members">
    <task-action-container @close="closeComp" title="Search Members">
      <form-input
        :showLabel="true"
        labelText="search for members"
        v-model="search"
        type="text"
      />
      <div>
        <div
          class="members-container"
          v-if="search.length || filterdMembers.length"
        >
          <div v-if="filterdMembers.length">
            <h3>{{ boardMembersText }}</h3>
            <member
              @toggleMember="toggleMember(member)"
              :member="member"
              :key="member._id"
              v-for="member in filterdMembers"
            >
              <i v-if="isInGroup(member)" class="el-icon-check v-member"></i>
            </member>
          </div>
          <div class="member-search-status" v-else>
            <h6>
              No members found please confirm that the person your'e looking for
              is a member of this board
            </h6>
          </div>
        </div>
        <div class="member-search-status" v-else>
          <h6>Start typing to search for members in the group</h6>
        </div>
      </div>
    </task-action-container>
  </section>
</template>

<script>
import TaskActionContainer from "./task-action-container.cmp";
import FormInput from "./FormElements/form-input.cmp";
import Member from "./UIComponents/member";

export default {
  props: ["boardMembers", "taskMembers"],
  components: {
    TaskActionContainer,
    FormInput,
    Member,
  },
  data() {
    return {
      search: "",
    };
  },
  created() {},
  computed: {
    filterdMembers() {
      const searchTerm = this.search.toLowerCase();
      return this.boardMembers.filter((member) =>
        member.username.toLowerCase().includes(this.search)
      );
    },
    boardMembersText() {
      return this.filterdMembers.length > 1 ? "Board Members" : "Board Member";
    },
  },
  methods: {
    closeComp() {
      this.$emit("closeMembersComp");
    },
    toggleMember(member) {
      const event = this.isInGroup(member) ? "removeMember" : "addMember";
      this.$emit(event, member);
    },
    isInGroup(member) {
      return this.taskMembers.find((m) => m._id === member._id);
    },
  },
};
</script>
