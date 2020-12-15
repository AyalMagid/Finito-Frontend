<template>
  <section class="task-duedate">
    <task-action-container @close="closeComp" title="Change Due Date">
      <!-- <DatePicker></DatePicker> -->
      <!--  -->
      <form>
        <el-date-picker v-model="date" type="date" placeholder="Pick a day"></el-date-picker>

        <!-- <h6>Set Reminder</h6>
    <select>
      <option value>1 Day before</option>
      <option value>2 Day before</option>
      <option value>In an hour</option>
      <option value>In a week</option>
      <option value>In a month</option>
        </select>-->
        <div class="task-duedate-btns-container">
          <button @click.prevent="emitDuedate" class="btn-primary">Save</button>
          <button @click.prevent="emitRemovedate" class="btn-primary remove">Remove</button>
        </div>
      </form>
    </task-action-container>
  </section>
</template>

<script>
import TaskActionContainer from "./task-action-container.cmp";
import { DatePicker } from "element-ui";

export default {
  data() {
    return {
      date: ""
    };
  },
  components: {
    TaskActionContainer,
    DatePicker
  },
  methods: {
    closeComp() {
      this.$emit("closeDateComp");
    },
    emitDuedate() {
      this.$emit(
        "dateChoosed",
        this.date
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" ")
      );
    },
    emitRemovedate() {
      this.$emit("dateRemoved");
    }
  }
};
</script>

<style lang="scss" >
</style>