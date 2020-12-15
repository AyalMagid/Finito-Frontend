<template>
  <section>
    <div class="task-activities">
      <div class="task-activties-header">
        <i class="fas fa-tasks"></i>
        <h4>
          Activity
        </h4>
        <button @click="toggleBtn">{{ btnTxt }}</button>
      </div>
  <!-- <task-comment/> -->
      <div v-if="showList" class="task-activities-list">
        <ul>
          <li v-for="(activity, idx) in activities" :key="idx">
            <div
              style="margin:5px 0;"
              class="flex align-center details-activity-avatar-text-wraper"
            >
              <avatar
                :size="35"
                :src="activity.byUser.img"
                :username="activity.byUser.username"
              />
             
              <section class="details-activity-text flex col">
                <div class="details-activity-user flex">  
                  <p><span class="details-activity-username">{{ activity.byUser.username  }}</span>{{ activity.txt }}</p>
                </div>
                <span>{{ activity.createdAt | relativeTime }}</span>
              </section>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import taskComment from "./task-comment.cmp"
export default {
  name: "task-activity",
  props: ["activities"],
  data() {
    return {
      btnTxt: "Hide Details",
      showList: true,
    };
  },
  created() {},
  methods: {
    toggleBtn() {
      if (this.btnTxt === "Hide Details") {
        this.btnTxt = "Show Details";
        this.showList = false;
      } else {
        this.btnTxt = "Hide Details";
        this.showList = true;
      }
    },
  },
  components: {
    Avatar,
    taskComment
  }
};
</script>
