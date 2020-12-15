<template>
  <section class="board-details-container" v-if="board" :style="boardBackground">
    <board-options-nav @toggleMenu="showSidebar = !showSidebar" />
    <section class="board-details">
      <modal @close="closeTaskModal" v-if="showModal">
        <task-details
          @close="closeTaskModal"
          v-if="taskToEdit"
          :taskToEdit="taskToEdit"
          @closeModal="closeTaskModal"
        />
      </modal>
      <Container
        @drop="onDrop"
        drag-handle-selector=".task-group-title"
        :drop-placeholder="upperDropPlaceholderOptions"
        orientation="horizontal"
      >
        <Draggable v-for="taskGroup in board.taskGroups" :key="taskGroup.id">
          <task-group :taskGroup="taskGroup" @taskDrop="onTaskDrop" @taskClicked="openTaskModal" />
        </Draggable>
        <add-group @addGroup="addGroup" />
      </Container>
    </section>
    <sidebar
      v-if="showSidebar"
      @close="showSidebar = false"
      @removeBoard="removeBoard"
      @setBackground="setBackground"
    />
  </section>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, utilService } from "../utils/utils.js";
import taskDetails from "@/components/task-details.cmp.vue";
import taskGroup from "../components/task-group.cmp.vue";
import socketService from "../services/socket-service";
import boardOptionsNav from "../components/board-options-nav.vue";
import addGroup from "../components/add-group.cmp";
import modal from "../components/UIComponents/modal";
import sidebar from "../components/sidebar/sidebar";
export default {
  name: "board-details",
  components: {
    Container,
    Draggable,
    taskGroup,
    taskDetails,
    boardOptionsNav,
    addGroup,
    modal,
    sidebar,
  },
  data() {
    return {
      taskToEdit: null,
      upperDropPlaceholderOptions: {
        className: "taskGroup-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      showModal: false,
      showSidebar: false,
    };
  },
  async created() {
    let id = this.$route.params.id;
    await this.$store.dispatch({ type: "getBoardById", id });
    socketService.setup();
    socketService.emit("joinedBoard", this.board._id);
    socketService.on("boardUpdate", (board) => {
      this.$store.commit({ type: "setBoard", board });
    });
    const bgSize = utilService.getUrlBasedOnScreenWidth(screen.width);
    if (this.board.style.bgUrls.length) {
      if (bgSize === "small")
        this.board.style.previewUrl = this.board.style.bgUrls[bgSize];
    }
  },
  destroyed(){
    socketService.off('boardUpdate')
    socketService.terminate();
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    boardBackground() {
      const style = this.$store.getters.style;
      const bgSize = utilService.getUrlBasedOnScreenWidth(screen.width);
      if (style.bgUrls.length) {
        return `background-image:url(${style.bgUrls[0][bgSize]});`;
      } else return `background-color:${style.bgColor};`;
    },
  },
  methods: {
    async setBackground({ payload, type }) {
      const board = utilService.deepCopy(this.board);
      if (type === "img") {
        board.style.bgUrls.splice(0, 1, payload);
        board.style.previewUrl = payload["thumbnail"];
      } else {
        board.style.bgUrls = [];
        board.style.previewUrl = "";
        board.style.bgColor = payload.color;
      }
      await this.$store.dispatch({ type: "saveBoard", board });
      socketService.emit("boardUpdate", this.board);
      const notification = utilService.getNewNotification(
        "Tomer",
        "background Changed"
      );
      socketService.emit("boardAction", notification);
    },
    async removeBoard() {
      await this.$store.dispatch({
        type: "deleteBoard",
        id: this.board._id,
      });
      this.$router.push("/");
    },
    onDrop(dropResult) {
      this.board.taskGroups = applyDrag(this.board.taskGroups, dropResult);
      this.sendToSocket(this.board);
    },
    onTaskDrop(taskGroupId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const board = Object.assign({}, this.board);
        const taskGroup = board.taskGroups.filter(
          (taskG) => taskG.id === taskGroupId
        )[0];
        const taskGroupIndex = board.taskGroups.indexOf(taskGroup);
        const newTaskGroup = Object.assign({}, taskGroup);
        newTaskGroup.tasks = applyDrag(newTaskGroup.tasks, dropResult);

        newTaskGroup.tasks.forEach((task) => {
          task.parentListId = newTaskGroup.id;
        });
        board.taskGroups.splice(taskGroupIndex, 1, newTaskGroup);
        this.sendToSocket(board);
      }
    },
    addGroup(newGroup) {
      const board = this.board;
      board.taskGroups.push(newGroup);
      this.$store.dispatch({ type: "saveBoard", board });
    },
    openTaskModal(task) {
      this.taskToEdit = task;
      this.showModal = !this.showModal;
    },
    closeTaskModal() {
      this.showModal = !this.showModal;
    },
    sendToSocket(board) {
      socketService.emit("boardUpdate", board);
    },
   
  },
};
</script>

<style scoped></style>
