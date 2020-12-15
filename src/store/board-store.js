import { boardService } from "../services/board-service.js";

export default {
  state: {
    boards: [],
    board: null,
    tasksRefs:[],
    filterBy: {
      name: "",
      tags: "",
      creator: "",
    },
    style:{
      // "bgColor" : "#48aef9",
      // "bgUrl" : "https://i.pinimg.com/originals/5e/65/20/5e6520289b44e11a9e74363c18ce3ee1.jpg"
    }
  },
  getters: {
    boards(state) {
      return state.boards;
    },
    board(state) {
      return state.board;
    },
    activities(state) {
      return state.board.activities;
    },
    getTaskGroupByIndex: (state) => (taskGroupId) => {
      return state.board.taskGroups.findIndex(
        (taskGroup) => taskGroup.id === taskGroupId
      );
    },
    style(state){
      return state.style
    },
    tasksRefs(state){
      return state.tasksRefs
    }
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    setBoard(state, { board }) {
      state.board = board;
      state.style=board.style
    },
    deleteBoard(state, { board }) {
      const idx = state.boards.findIndex((t) => t._id === board._id);
      state.boards.splice(idx, 1);
    },
    updateBoard(state, { board }) {
      const idx = state.boards.findIndex(
        (currentBoard) => currentBoard._id === board._id
      );
      state.boards.splice(idx, 1, board);
      state.board = board;
      state.style=board.style
    },
    addBoard(state, { board }) {
      state.boards.unshift(board);
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setStyle(state,{style}){
      state.style=style
    },
    addToTasksRefs(state,{ref}){
      state.tasksRefs.push(ref)
    }
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query();
        commit({ type: "setBoards", boards });
        return boards;
      } catch (err) {
        console.log("Problem getting board ");
        throw err;
      }
    },
    async getBoardById({ commit }, { id }) {
      try {
        let board = await boardService.getById(id);
        commit({ type: "setBoard", board });
        return board;
      } catch (err) {
        console.log("Problem getting board ");
        throw err;
      }
    },
    async deleteBoard({ commit }, { id }) {
      try {
        await boardService.deleteBoard(id);
        commit({ type: "deleteBoard", id });
      } catch (err) {
        console.log("Problem Deleting board ");
        throw err;
      }
    },
    async saveBoard({ commit }, { board }) {
      const type = board._id ? "updateBoard" : "addBoard";
      try {
        const savedBoard = await boardService.save(board);
        commit({ type, board: savedBoard });
        return savedBoard;
      } catch (err) {
        console.log("Problem Saving board id-", board._id);
        throw err;
      }
    },
  },
};
