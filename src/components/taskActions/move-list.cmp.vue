<template>
  <div>
    <form-select
      @selected="selected"
      :options="boardsToRender.boardNames"
      :showLabel="true"
      labelText="board"
    />
    <!-- <form-select
      @selected="selected"
      :options="boardsToRender.positions"
      :showLabel="true"
      labelText="Position"
    />-->

    <button @click="moveToDifferentBoard" class="btn-primary">Move</button>
  </div>
</template>

<script>
import FormSelect from "../FormElements/form-select.cmp";
export default {
  data() {
    return {
      optionsData: ["board-1", "board-2"],
      positions: [1, 2, 3, 4, 5, 6],
      boardToMoveTo: -1,
    };
  },
  methods: {
    selected({ option, index }) {
      this.boardToMoveTo = index;
    },
    moveToDifferentBoard() {
      this.$emit("moveToDifferentBoard", this.boardToMoveTo);
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    boardsToRender() {
      const boardNames = this.boards.map((board) => {
        return board.name;
      });
      return {
        boardNames,
      };
    },
  },
  components: {
    FormSelect,
  },
};
</script>

<style></style>
