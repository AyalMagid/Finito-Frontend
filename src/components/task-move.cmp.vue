<template>
  <section class="task-move">
    <task-action-container @close="closeComp" title="Move Task-Group">
      <h5>Select Other Group</h5>
      <el-select v-model="newTaskGroup" placeholder="Select">
            <el-option v-for="(item, idx) in options" :key="idx" :label="item" :value="item"></el-option>
      </el-select>
      <button @click="emitMoveTask" class="btn-primary large">Move</button>
    </task-action-container>
  </section>
</template>
<script>
import TaskActionContainer from "./task-action-container.cmp";
export default {
  name: "task-move",
  props: ["taskGropus"],
  data() {
    return {
          options:this.taskGropus.map(tg => tg.title),
          newTaskGroup: ''
    };
  },
  methods: {
    closeComp() {
      this.$emit("closeMoveComp");
    },
    emitMoveTask (){
      const newGroup = this.taskGropus.find(tg => tg.title === this.newTaskGroup)
      this.$emit ('taskMoved', newGroup.id)
    },
  },
  components: {
    TaskActionContainer
  }
};
</script>

<style>
</style>