<template>
  <div ref="taskPreview" class="task-preview-container">
    <div :style="taskCover" class="task-cover" @click="taskClicked"></div>
    <div class="task-preview-content">
      <div v-if="currentTask.labels.length >= 1" class="task-label-container">
        <small-label
          @labelClicked="toggleLabels"
          :enenlargeLabel="enlargeLabel"
          :key="index"
          v-for="(label, index) in currentTask.labels"
          :label="label"
        />
      </div>
      <div class="task-title-container flex">
        <span @click="taskClicked">{{ task.title }}</span>
      </div>
      <div class="task-status-container" @click="taskClicked">
        <div
          class="due-date-container"
          :class="dueDateClass"
          v-if="currentTask.dueDate"
        >
          <i class="far fa-clock duedate-clock-icon"></i>
          <span>{{ currentTask.dueDate | moment("MMM D") }}</span>
        </div>
        <i v-if="currentTask.desc" class="fas fa-stream"></i>
        <div
          v-if="currentTask.attachments.length"
          class="attachments-container"
        >
          <i class="fas fa-paperclip"></i>
          <span>{{ this.currentTask.attachments.length }}</span>
        </div>
        <div
          :class="{ 'check-list-completed': allCompleted }"
          class="checklist-container"
          v-if="currentTask.checkLists.length"
        >
          <div v-if="checkListsStatus.allTasks">
            <i class="far fa-check-square"></i>
            <span>{{ taskString }}</span>
          </div>
        </div>

        <div class="task-members-preview flex space-between">
          <Avatar
            v-for="member in task.members"
            :key="member._id"
            :src="member.img"
            :username="member.username"
            :size="24"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./UIComponents/modal";
import SmallLabel from "./UIComponents/small-label";
import Avatar from "vue-avatar";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      displayModal: false,
    };
  },
  computed: {
    checkListsStatus() {
      let isUncompleted;
      let completedAmout = 0;
      let allTasks = 0;
      this.currentTask.checkLists.forEach((checkList) => {
        allTasks += checkList["items"].length;
        isUncompleted = checkList["items"].some((item) => !item.completed);
        completedAmout += checkList["items"].reduce((acc, task) => {
          if (task.completed) acc++;
          return acc;
        }, 0);
      });
      return {
        allTasks,
        isUncompleted,
        completedAmout,
      };
    },
    taskCover() {
      if (this.currentTask.cover.url) {
        return (
          `background:url("${this.currentTask.cover.url}");` + "height:200px"
        );
      } else {
        return this.currentTask.cover.color
          ? "background-color:" + this.currentTask.cover.color + ";height:25px"
          : "";
      }
    },
    taskString() {
      return `  ${this.checkListsStatus.completedAmout}/${this.checkListsStatus.allTasks}`;
    },
    allCompleted() {
      return (
        this.checkListsStatus.completedAmout ===
          this.checkListsStatus.allTasks && this.checkListsStatus.allTasks >= 1
      );
    },
    currentTask() {
      const board = this.$store.getters.board;
      const currentTaskGroup = board.taskGroups.findIndex(
        (taskGroup) => taskGroup.id === this.task.parentListId
      );
      const currentTask = board.taskGroups[currentTaskGroup].tasks.find(
        (task) => task.id === this.task.id
      );
      return currentTask;
    },
    board() {
      return this.$store.getters.board;
    },
    enlargeLabel() {
      const currentTaskGroup = this.board.taskGroups.findIndex(
        (taskGroup) => taskGroup.id === this.task.parentListId
      );
      return this.board.taskGroups[currentTaskGroup].labelsOpen;
    },
    dueDateClass() {
      const taskDueDate = new Date(this.currentTask.dueDate);
      const today = new Date();
      const difference =
        taskDueDate > today
          ? Math.abs(taskDueDate - today)
          : Math.abs(today > taskDueDate);
      const diffrenceInDays = Math.round(difference / (1000 * 60 * 60 * 24));
      if (this.currentTask.isComplete) {
        return "due-green";
      }
      if (diffrenceInDays >= 2) {
        return "due-far";
      } else if (diffrenceInDays === 1) {
        return "due-yellow";
      } else if (diffrenceInDays === 0) {
        return "due-red";
      }
    },
  },
  methods: {
    taskClicked() {
      this.$emit("taskClicked", this.task);
    },
    toggleLabels() {
      this.board.taskGroups.forEach((taskGroup) => {
        taskGroup.labelsOpen = !taskGroup.labelsOpen;
      });
    },
  },
  components: {
    Modal,
    SmallLabel,
    Avatar,
  },
  mounted(){;
    this.$store.commit({type:"addToTasksRefs",ref:{name:this.task.title,el:this.$refs.taskPreview}})
  }
};
</script>

<style lang="scss"></style>
