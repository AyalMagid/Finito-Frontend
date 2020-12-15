<template>
  <section class="checklist-wrapper">
    <section class="checklist-header">
      <i class="far fa-check-square check-icon"></i>
      <!-- <i class="el-icon-circle-check check-icon"></i> -->
      <h4>{{ checklist.title }}</h4>
      <button class="checklist-remove-btn" @click="removeList">Delete</button>
    </section>
    <div class="checklist-progress-bar">
      <el-progress
        :percentage="completedItems"
        :color="checklistStatus"
      ></el-progress>
    </div>
    <ul class="checklist-container clean-list">
      <li v-for="(item, idx) in checklist.items" class="list-item" :key="idx">
        <input
          type="checkbox"
          v-model="item.completed"
          :id="idx"
          @click="changeItemStatus(idx)"
        />
        <label
          :for="idx"
          class="check-item"
          :class="{ isDone: item.completed }"
          >{{ item.content }}</label
        >
        <i class="fas fa-trash-alt" @click="removeItem(idx)"></i>
      </li>
    </ul>
    <section class="add-item flex space-between" v-if="isAddClicked">
      <input
        v-model="newItemTxt"
        @keyup.enter="addItem"
        type="text"
        placeholder="Enter New Item.."
      />
    </section>
    <section class="add-section flex">
      <button
        class="add-item-btn"
        :class="{ addIsOpen: isAddClicked }"
        @click="addAction"
      >
        {{ addItemStatus }}
      </button>
      <i @click="openCloseAdd" class="el-icon-close"></i>
    </section>
  </section>
</template>

<script>
export default {
  name: "Checklist-CMP",
  props: ["checklist"],
  data() {
    return {
      isAddClicked: false,
      newItemTxt: "",
      status: 0,
    };
  },
  computed: {
    completedItems() {
      const completed = this.checklist.items.reduce((acc, item) => {
        if (item.completed) ++acc;
        return acc;
      }, 0);
      this.status = Math.floor((completed / this.checklist.items.length) * 100);
      return this.status > 0 ? this.status : 0;
    },
    addItemStatus() {
      return this.isAddClicked ? "Add" : "Add an item";
    },
    checklistStatus() {
      return this.completedItems === 100 ? "green" : "";
    },
  },
  methods: {
    openCloseAdd() {
      this.isAddClicked = !this.isAddClicked;
    },
    addItem() {
      if (this.newItemTxt === "") return;
      let newItem = {
        content: this.newItemTxt,
        completed: false,
      };
      this.checklist.items.push(newItem);
      this.newItemTxt = "";
      this.$emit("update");
    },
    addAction() {
      this.isAddClicked ? this.addItem() : this.openCloseAdd();
    },
    removeItem(idx) {
      this.checklist.items.splice(idx, 1);
      this.$emit("update");
    },
    changeItemStatus(idx) {
      this.checklist.items[idx].completed = !this.checklist.items[idx]
        .completed;
      this.$emit("update");
    },
    removeList() {
      this.$emit("remove");
    },
  },
};
</script>
