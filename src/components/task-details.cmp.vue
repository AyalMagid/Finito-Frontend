<template>
  <!-- will change to col from task width-->
  <div class="task-details-containers-wraper">
    <button class="close-modal-btn" @click="$emit('close')">
      <i class="fas fa-times-circle"></i>
    </button>
    <div class="task-details-main-container">
      <div class="task-left-container">
        <div class="task-details-titles-container">
          <i class="el-icon-postcard"></i>
          <input type="text" v-model="task.title" class="task-name" @blur="updateTitle" />
          <h6 class="task-group-name">
            in Task-Group
            <span>{{ taskGroup.title }}</span>
          </h6>
        </div>
        <!-- combine with due date -->
        <!-- <el-checkbox  @click="toggleTaskCompletion" v-model="checked" class="task-isComplete" >Completed</el-checkbox> -->
        <div class="task-members-labels-date flex wrap">
          <section v-show="task.members.length" class="task-members-container-wraper">
            <h6>MEMBERS</h6>
            <div class="task-members-container flex">
              <div v-for="(member, idx) in task.members" :key="idx">
                <avatar v-if="member.img" :src="member.img" :size="30"></avatar>
                <avatar v-else :username="member.username" :size="30"></avatar>
              </div>
            </div>
          </section>
          <section v-show="task.labels.length" class="task-labels-container-wraper">
            <h6>LABELS</h6>
            <div class="task-labels-container flex">
              <color-small size="extra-small" :propColor="task.labels" @colorClicked="removeLabel" />
              <div class="add-label">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </section>
          <section v-show="task.dueDate" class="task-date-container-wraper">
            <h6>DUE DATE</h6>
            <div class="task-date-container flex">
              <i @click="toggleTaskCompletion" :class="checkBoxIcon" class="checkbox-icon"></i>
              <!-- <input type="checkbox" v-model="task.isComplete" @click="toggleTaskCompletion" /> -->
              <span :class="dueDateClass" class="task-date">
                {{
                task.dueDate
                }}
              </span>
            </div>
          </section>
        </div>
        <div class="task-desc-container">
          <i class="el-icon-s-unfold"></i>
          <h4>Description</h4>
          <textarea
            placeholder="Add Description to task.."
            @click="focusOnDesc"
            v-model="task.desc"
            ref="desTextArea"
            @blur="removeFocus"
            class="desc-textarea"
            :style="calcLength"
          />
        </div>
        <div class="task-attachments-container" v-if="task.attachments.length > 0">
          <i class="fas fa-file-alt"></i>
          <h4>Attachments</h4>
          <file-preview
            v-for="(file, idx) in task.attachments"
            :file="file"
            :cover="task.cover"
            :key="idx"
            @remove="removeAttach(idx)"
            @cover="setTaskCover(idx)"
          />
        </div>
        <div class="task-checklists" v-if="task.checkLists.length > 0">
          <task-check-list
            v-for="(checklist, idx) in task.checkLists"
            :checklist="checklist"
            :key="idx"
            @remove="removeCheckList(idx)"
            @update="updateCheckList(idx)"
          />
        </div>
        <task-activity v-if="activitiesToShow" :activities="activitiesToShow" />
      </div>
      <div class="task-right-container">
        <details-btns
          :board="boardToEdit"
          :user="user"
          :taskIdx="taskIdx"
          :task="task"
          @emitBoardChange="boardChanged"
          @emitCloseModal="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { utilService } from "../utils/utils.js";
import { loggerService } from "../services/logger-service.js";
import socketService from "../services/socket-service.js";
import TaskActionContainer from "./task-action-container.cmp";
import detailsBtns from "./details-btns.cmp";
import taskCheckList from "../components/checklist-preview-cmp";
import taskActivity from "../components/task-activity.cmp.vue";
import taskAttachment from "../components/task-attachment.cmp.vue";
import filePreview from "../components/task-attach-preview.cmp.vue";
import colorSmall from "../components/UIComponents/color-small";
import modal from "../components/UIComponents/modal";

import Avatar from "vue-avatar";
import { eventBus, SHOW_MSG } from "../services/event-bus-service.js";

export default {
  name: "task-details",
  props: ["taskToEdit"],
  data() {
    return {
      task: null,
      currDescription: this.taskToEdit.desc,
      taskGroup: null,
      user: null,
      taskIdx: null,
      // checked: false,
      boardToEdit: null,
    };
  },
  created() {
    this.boardToEdit = JSON.parse(JSON.stringify(this.board));
    const taskGroupId = this.taskToEdit.parentListId;
    this.taskGroup = this.boardToEdit.taskGroups.find(
      (tg) => tg.id === taskGroupId
    );
    const taskGroupIdx = this.boardToEdit.taskGroups.findIndex(
      (tg) => tg.id === taskGroupId
    );
    this.task = this.taskGroup.tasks.find(
      (task) => task.id === this.taskToEdit.id
    );
    this.taskIdx = this.taskGroup.tasks.findIndex((t) => t.id === this.task.id);
    this.user = this.$store.getters.loggedUser
     socketService.on("boardUpdate", (board) => {
        this.$store.commit({ type: "setBoard", board })
     })
  },
  destroyed(){
    socketService.off('boardUpdate')
  },

  computed: {
    board() {
      return this.$store.getters.board;
    },
    activitiesToShow() {
      let activities = null;
      if (this.boardToEdit.activities.length > 0) {
        activities = this.boardToEdit.activities;
        activities = activities.filter(
          (activity) => activity.editedTask.id === this.task.id
        );
        return activities;
      }
    },
    checkBoxIcon() {
      return this.taskToEditState.isComplete
        ? "far fa-check-square"
        : "far fa-square";
    },
    dueDateClass() {
      const taskDueDate = new Date(this.taskToEdit.dueDate);
      const today = new Date();
      const difference =
        taskDueDate > today
          ? Math.abs(taskDueDate - today)
          : Math.abs(today > taskDueDate);
      const diffrenceInDays = Math.round(difference / (1000 * 60 * 60 * 24));
      if (this.taskToEdit.isComplete) {
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
    taskToEditState() {
      const taskGroup = this.board.taskGroups.find(
        (tg) => tg.id === this.task.parentListId
      );
      return taskGroup.tasks.find((t) => t.id === this.task.id);
    },
    calcLength(){
      let length=this.task.desc.length<60?60:this.task.desc.length
      return `height:${length/1.7}px`
    }
  },
  methods: {
    updateBoard(actionStr = "ACTION SAVED") {
      socketService.emit("boardUpdate", this.boardToEdit);
      // console.log("state board labels", this.state.board.labels);
      // console.log("props board labels", this.boardToEdit.labels);
        // const savedBoard = await this.$store.dispatch({
        //   type: "updateBoard",
        //   board: this.boardToEdit
  
      // USER MSG
      // const type = savedBoard ? "success" : "error";
      // let fixedStr = actionStr;
      // if (actionStr !== "ACTION SAVED") {
      //   let words = actionStr.split("_");
      //   if (words) fixedStr = `${words[0]} ${words[1]}`;

      // const msg = savedBoard
      //   ? `${fixedStr} SUCCESSFULLY!`
      //   : `${fixedStr} FAILD...`;
      // eventBus.$emit(SHOW_MSG, { msg, type });
    },
    closeModal() {
      this.$emit("closeModal");
    },
    boardChanged(action, changed = null) {
      changed ? this.addActivity(action, changed) : this.addActivity(action);
    },
    //TITLE
    updateTitle() {
      this.addActivity("UPDATED_TITLE");
    },
    //DESCREPTION
    focusOnDesc() {
      this.$refs.desTextArea.select();
      this.$refs.desTextArea.classList.add("edit");
    },
    removeFocus() {
      this.$refs.desTextArea.classList.remove("edit");
      if (this.currDescription !== this.task.desc) {
        this.addActivity("UPDATED_DESCRIPSTION");
        this.currDescription = this.task.desc;
      }
    },
    toggleTaskCompletion() {
      let action = "";
      this.task.isComplete = !this.task.isComplete;
      action = this.task.isComplete ? "COMPLETED_TASK" : "INCOMPLETED_TASK";
      this.addActivity(action);
    },
    //ATTACHMENT
    removeAttach(idx) {
      this.task.attachments.splice(idx, 1);
      this.addActivity("REMOVED_ATTACHMENT");
    },

    setTaskCover(idx) {
      if (this.task.cover.url === this.task.attachments[idx].imageUrl) {
        this.task.cover.url = "";
        this.addActivity("REMOVED_COVER");
      } else {
        this.task.cover.url = this.task.attachments[idx].imageUrl;
        this.addActivity("ADDED_COVER");
      }
    },
    // CHECKLIST
    removeCheckList(idx) {
      this.task.checkLists.splice(idx, 1);
      this.addActivity("REMOVED_CHECKLIST");
    },
    // will emit from the checklistpreview comp
    updateCheckList(idx) {
      const checklist = this.task.checkLists[idx];
      this.addActivity("UPDATED_CHECKLIST", checklist.title);
    },
    // get a string as an action and if needed another string of what changed
    addActivity(action, changed = "") {
      let activityToAdd = {
        editedTask: { id: this.task.id, title: this.task.title },
        action,
        byUser: this.user,
        txt: loggerService.buildLog(action, changed, this.task),
        createdAt: Date.now(),
      };
      this.boardToEdit.activities.unshift(activityToAdd);
      this.updateBoard(action);
    },
    removeLabel(_, index) {
      this.task.labels.splice(index, 1);
      this.addActivity("REMOVED_LABEL");
    },
  },

  components: {
    taskCheckList,
    Avatar,
    TaskActionContainer,
    taskActivity,
    detailsBtns,
    filePreview,
    colorSmall,
    modal,
  },
  
};
</script>

<style lang="scss" scoped>
.color {
  margin: 5px 10px;
  width: 55px;
  height: 35px;
  border-radius: 3px;
}
</style>
