<template>
  <section class="task-actions">
    <label class="section-header">ADD TO TASK</label>
    <button class="detail-btn" @click="toggleComponentToRender('memebersOpen')">
      <i class="el-icon-user"></i> Members
    </button>
    <task-members
      @addMember="addMember"
      @removeMember="removeMember"
      @closeMembersComp="toggleComponentToRender('memebersOpen')"
      v-if="componentsToToggle.memebersOpen"
      :boardMembers="board.members"
      :taskMembers="task.members"
    />
    <button class="detail-btn" @click="toggleComponentToRender('addLabelOpen')">
      <i class="el-icon-price-tag"></i>Labels
    </button>
    <task-label
      v-if="componentsToToggle.addLabelOpen"
      @editLabel="editLabel"
      @setLabel="addLabel"
      @close="toggleComponentToRender('addLabelOpen')"
      :labels="board.labels"
      :board="board"
      :task="taskToEdit"
    />
    <button class="detail-btn" @click="toggleComponentToRender('duedateOpen')">
      <i class="el-icon-date"></i> Due date
    </button>
    <task-duedate
      v-if="componentsToToggle.duedateOpen"
      @dateChoosed="saveDuedate"
      @dateRemoved="removeDuedate"
      @closeDateComp="toggleComponentToRender('duedateOpen')"
    />
    <button
      class="detail-btn"
      @click="toggleComponentToRender('addCheckListOpen')"
    >
      <i class="el-icon-document-checked"></i>
      Checklist
    </button>
    <task-checkList
      @close="toggleComponentToRender('addCheckListOpen')"
      v-if="componentsToToggle.addCheckListOpen"
      @createCheckList="addCheckList"
    />
    <button
      class="detail-btn"
      @click="toggleComponentToRender('attachmentsOpen')"
    >
      <i class="el-icon-paperclip"></i> Attachment
    </button>
    <task-attachment
      v-if="componentsToToggle.attachmentsOpen"
      @closeAttach="toggleComponentToRender('attachmentsOpen')"
      @uploded="addAttachment"
    />
    <button class="detail-btn" @click="toggleComponentToRender('addCoverOpen')">
      <i class="el-icon-picture-outline"></i> Cover
    </button>
    <task-cover
      v-if="componentsToToggle.addCoverOpen"
      :isCoverSet="isCoverSet"
      @setCover="updateCover"
      @removeCover="removeCover"
      @close="toggleComponentToRender('addCoverOpen')"
    />
    <label class="section-header">ACTIONS</label>
    <button class="detail-btn" @click="copyTask">
      <i class="el-icon-document-copy"></i> Copy
    </button>
    <button class="detail-btn" @click="removeTask">
      <i class="el-icon-delete"></i> Remove
    </button>
    <button class="detail-btn" @click="toggleComponentToRender('moveCompOpen')">
      <i class="el-icon-right"></i> Move
    </button>
    <task-move
      v-if="componentsToToggle.moveCompOpen"
      :taskGropus="this.board.taskGroups"
      @closeMoveComp="toggleComponentToRender('moveCompOpen')"
      @taskMoved="moveTask"
    />
    <button
      @click="toggleWatch"
      class="flex space-between align-center detail-btn"
    >
      <div><i class="el-icon-view"></i> Watch</div>
      <i v-show="watchIsOn" class="el-icon-check v-watch"></i>
    </button>
  </section>
</template>

<script>
import taskMembers from "../components/task-members.cmp.vue";
import taskDuedate from "../components/task-duedate.cmp.vue";
import taskAttachment from "../components/task-attachment.cmp.vue";
import taskCheckList from "../components/task-checklist.cmp";
import taskMove from "../components/task-move.cmp.vue";
import taskLabel from "../components/taskLabel/taks-label.cmp";
import taskCover from "../components/taskCover/task-cover.cmp";
import { utilService } from "../utils/utils.js";
export default {
  props: ["board", "task", "taskIdx", "user", "labelToRemove"],
  data() {
    return {
      componentsToToggle: {
        memebersOpen: false,
        duedateOpen: false,
        moveCompOpen: false,
        attachmentsOpen: false,
        addCheckListOpen: false,
        taskToEdit: null,
        taskGroup: null,
        addCheckListOpen: false,
        addLabelOpen: false,
        addCoverOpen: false,
      },
    };
  },
  created() {
    this.taskGroup = this.board.taskGroups.find(
      (tg) => tg.id === this.task.parentListId
    );
    this.taskToEdit = this.taskGroup.tasks.find((t) => t.id === this.task.id);
  },
  computed: {
    watchIsOn() {
      const isOn = this.taskToEdit.watchMembers.find(
        (member) => member._id === this.user._id
      )
        ? true
        : false;
      return isOn;
    },
    isCoverSet() {
      return !!this.taskToEdit.cover.url || !!this.taskToEdit.cover.color;
    },
    stateBoard() {
      return this.$store.getters.board;
    },
    taskToEditState() {
      const taskGroup = this.stateBoard.taskGroups.find(
        (tg) => tg.id === this.task.parentListId
      );
      return taskGroup.tasks.find((t) => t.id === this.task.id);
    },
  },
  methods: {
    // TASKS
    removeTask() {
      this.taskGroup.tasks.splice(this.taskIdx, 1);
      this.$emit("emitBoardChange", "REMOVED_TASK");
      this.$emit("emitCloseModal");
    },
    // change id after copy --- make an option of copying to other lists
    copyTask() {
      let coppiedTask = JSON.parse(JSON.stringify(this.task));
      coppiedTask.id = utilService.getRandomId();
      this.taskGroup.tasks.unshift(coppiedTask);
      this.$emit("emitBoardChange", "COPPIED_TASK");
    },
    // gets the new taskgroup id from the relevant comp
    moveTask(newTaskgroupId) {
      this.taskToEdit.parentListId = newTaskgroupId;
      const newGroupIdx = this.board.taskGroups.findIndex(
        (tg) => tg.id === newTaskgroupId
      );
      this.taskGroup.tasks.splice(this.taskIdx, 1);
      this.board.taskGroups[newGroupIdx].tasks.push(this.taskToEdit);
      this.$emit("emitBoardChange", "MOVED_TASK", this.taskGroup.title);
      this.$emit("emitCloseModal");
    },
    // LABELS
    addLabel({ id, title, color, selectedColor }, index) {
      const taskLabel = {
        title,
        color,
        id,
      };
      const labelIndex = this.taskToEdit.labels.findIndex(
        (label) => label.id === taskLabel.id
      );
      if (labelIndex > -1) {
        this.taskToEdit.labels.splice(labelIndex, 1);
        // this.taskToEditState.labels.splice(labelIndex, 1);
        this.$emit("emitBoardChange", "REMOVED_LABEL");
      } else {
        this.taskToEdit.labels.push(taskLabel);
        // this.taskToEditState.labels.push(taskLabel);
        this.$emit("emitBoardChange", "ADDED_LABEL");
      }
    },
    editLabel({ label: { title, id, color, selectedColor }, index }) {
      const boardLabel = {
        id,
        title,
        color,
        selectedColor,
        wasClicked: false,
      };
      const updatedLabel = {
        id,
        title,
        color,
      };

      const board = utilService.deepCopy(this.stateBoard);
      board.labels.splice(index, 1, boardLabel);

      board.taskGroups.forEach((taskGroup) => {
        taskGroup.tasks.forEach((task, taskIdx) => {
          task.labels.forEach((label, taskIdX) => {
            if (label.id === updatedLabel.id) {
              label.id = updatedLabel.id;
              label.color = updatedLabel.color;
              label.title = updatedLabel.title;
            }
          });
        });
      });
      this.$store.dispatch({ type: "saveBoard", board });
    },
    removeLabel() {
      this.taskToEdit.labels.splice(this.labelToRemove, 1);
      this.$emit("emitBoardChange", "REMOVED_LABEL");
    },
    toggleComponentToRender(toggleName) {
      for (const key in this.componentsToToggle) {
        if (key === toggleName) {
          this.componentsToToggle[key] = !this.componentsToToggle[key];
        } else {
          this.componentsToToggle[key] = false;
        }
      }
    },
    // MEMBERS
    addMember(member) {
      this.taskToEdit.members.push(member);
      this.$emit("emitBoardChange", "JOINED_MEMBER");
    },
    removeMember(member) {
      const idx = this.task.members.findIndex((m) => m._id === member._id);
      this.taskToEdit.members.splice(idx, 1);
      this.$emit("emitBoardChange", "MEMBER_LEFT");
    },
    // CHECKLIST => inside will be also items crudl
    addCheckList(title) {
      this.taskToEdit.checkLists.push(utilService.getEmptyCheckList(title));
      this.$emit("emitBoardChange", "ADDED_CHECKLIST");
    },
    //Attachments
    addAttachment(fileObj) {
      this.taskToEdit.attachments.push(fileObj);
      this.$emit("emitBoardChange", "ADDED_ATTACHMENT");
    },
    // OTHERS
    saveDuedate(date) {
      this.taskToEdit.dueDate = date;
      this.$emit("emitBoardChange", "CHANGED_DATE", date);
    },
    removeDuedate() {
      if (this.taskToEdit.dueDate) {
        this.taskToEdit.dueDate = "";
      } else {
        console.log("there is no duedate to remove...");
      }
      this.$emit("emitBoardChange", "REMOVED_DATE");
    },
    updateCover(cover) {
      if (cover.type === "image") {
        this.taskToEdit.cover.color = "";
        this.taskToEdit.cover.url = cover.payload;
      } else {
        this.taskToEdit.cover.url = "";
        this.taskToEdit.cover.color = cover.payload;
      }
      this.$emit("emitBoardChange", "UPDATED_COVER");
    },
    removeCover() {
      this.taskToEdit.cover.url = "";
      this.taskToEdit.cover.color = "";
      this.$emit("emitBoardChange", "REMOVED_COVER");
    },
    toggleWatch() {
      const idx = this.taskToEdit.watchMembers.findIndex(
        (member) => member._id === this.user._id
      );
      if (idx !== -1) {
        this.taskToEdit.watchMembers.splice(idx, 1);
        this.$emit("emitBoardChange", "UNWATCHED_TASK");
      } else {
        this.taskToEdit.watchMembers.push(this.user);
        this.$emit("emitBoardChange", "WATCHED_TASK");
      }
    },
  },
  components: {
    taskMembers,
    taskDuedate,
    taskMove,
    taskAttachment,
    taskCheckList,
    taskLabel,
    taskCover,
  },
};
</script>
